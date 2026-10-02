package com.smartclass.service;

import com.smartclass.dto.CreateQuizRequest;
import com.smartclass.dto.OfflineQuizSubmissionDTO;
import com.smartclass.dto.QuizAttemptDTO;
import com.smartclass.dto.QuizDTO;
import com.smartclass.dto.QuizResultDTO;
import com.smartclass.dto.SubmitQuizRequest;
import com.smartclass.entity.EducationSubsystem;
import com.smartclass.entity.Quiz;
import com.smartclass.entity.QuizAnswer;
import com.smartclass.entity.QuizAttempt;
import com.smartclass.entity.QuizAttemptStatus;
import com.smartclass.entity.QuizOption;
import com.smartclass.entity.QuizQuestion;
import com.smartclass.entity.SchoolClass;
import com.smartclass.entity.Subject;
import com.smartclass.entity.User;
import com.smartclass.exception.ApiException;
import com.smartclass.repository.QuizAttemptRepository;
import com.smartclass.repository.QuizRepository;
import com.smartclass.repository.SchoolClassRepository;
import com.smartclass.repository.SubjectRepository;
import com.smartclass.repository.UserRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository attemptRepository;
    private final SchoolClassRepository schoolClassRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<QuizDTO> findAll(String requesterEmail, EducationSubsystem subsystem) {
        User requester = findUser(requesterEmail);
        boolean studentWithClass = requester.getRole().name().equals("STUDENT")
                && requester.getSchoolClass() != null;
        List<Quiz> quizzes;
        if (studentWithClass && subsystem != null) {
            quizzes = quizRepository
                    .findAllByPublishedTrueAndSchoolClassIdAndSchoolClassSubsystemOrderByCreatedAtDesc(
                            requester.getSchoolClass().getId(), subsystem);
        } else if (studentWithClass) {
            quizzes = quizRepository.findAllByPublishedTrueAndSchoolClassIdOrderByCreatedAtDesc(
                    requester.getSchoolClass().getId());
        } else if (subsystem != null) {
            quizzes = quizRepository.findAllByPublishedTrueAndSchoolClassSubsystemOrderByCreatedAtDesc(
                    subsystem);
        } else {
            quizzes = quizRepository.findAllByPublishedTrueOrderByCreatedAtDesc();
        }
        return quizzes.stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public QuizDTO findById(Long id) {
        return toDto(findQuiz(id));
    }

    @Transactional
    public QuizDTO create(CreateQuizRequest request, String authorEmail) {
        User author = findUser(authorEmail);
        SchoolClass schoolClass = schoolClassRepository.findById(request.classId())
                .orElseThrow(() -> new ApiException("Class not found"));
        Subject subject = subjectRepository.findById(request.subjectId())
                .orElseThrow(() -> new ApiException("Subject not found"));
        if (!subject.getSchoolClass().getId().equals(schoolClass.getId())) {
            throw new ApiException("Subject does not belong to the selected class");
        }
        if (subject.getSubsystem() != schoolClass.getSubsystem()) {
            throw new ApiException("Subject subsystem does not match the selected class");
        }

        Quiz quiz = new Quiz();
        quiz.setTitle(request.title().trim());
        quiz.setDescription(normalize(request.description()));
        quiz.setDurationSeconds(request.durationSeconds());
        quiz.setPublished(true);
        quiz.setAuthor(author);
        quiz.setSchoolClass(schoolClass);
        quiz.setSubject(subject);

        Map<Integer, Boolean> positions = new HashMap<>();
        for (CreateQuizRequest.QuestionRequest questionRequest : request.questions()) {
            if (positions.put(questionRequest.position(), Boolean.TRUE) != null) {
                throw new ApiException("Question positions must be unique");
            }
            long correctCount = questionRequest.options().stream()
                    .filter(CreateQuizRequest.OptionRequest::correct)
                    .count();
            if (correctCount != 1) {
                throw new ApiException("Each question must have exactly one correct option");
            }

            QuizQuestion question = new QuizQuestion();
            question.setStatement(questionRequest.statement().trim());
            question.setPoints(questionRequest.points());
            question.setPosition(questionRequest.position());
            question.setQuiz(quiz);
            for (CreateQuizRequest.OptionRequest optionRequest : questionRequest.options()) {
                QuizOption option = new QuizOption();
                option.setLabel(optionRequest.label().trim());
                option.setPosition(optionRequest.position());
                option.setCorrect(optionRequest.correct());
                option.setQuestion(question);
                question.getOptions().add(option);
            }
            quiz.getQuestions().add(question);
        }
        return toDto(quizRepository.save(quiz));
    }

    @Transactional
    public QuizAttemptDTO startAttempt(Long quizId, String studentEmail) {
        User student = findUser(studentEmail);
        requireStudent(student);
        Quiz quiz = findQuiz(quizId);
        if (!quiz.isPublished()) {
            throw new ApiException("Quiz is not published");
        }
        if (student.getSchoolClass() == null
                || !student.getSchoolClass().getId().equals(quiz.getSchoolClass().getId())) {
            throw new ApiException("Quiz is not assigned to the student's class");
        }
        if (attemptRepository.findByQuizIdAndStudentIdAndStatus(
                quizId, student.getId(), QuizAttemptStatus.IN_PROGRESS).isPresent()) {
            throw new ApiException("An attempt is already in progress");
        }

        QuizAttempt attempt = new QuizAttempt();
        attempt.setQuiz(quiz);
        attempt.setStudent(student);
        attempt.setStartedAt(Instant.now());
        attempt.setMaxScore(maxScore(quiz));
        attempt.setStatus(QuizAttemptStatus.IN_PROGRESS);
        QuizAttempt saved = attemptRepository.save(attempt);
        return toAttemptDto(saved);
    }

    @Transactional
    public QuizResultDTO submitAttempt(Long attemptId, SubmitQuizRequest request, String studentEmail) {
        User student = findUser(studentEmail);
        requireStudent(student);
        QuizAttempt attempt = attemptRepository.findByIdAndStudentId(attemptId, student.getId())
                .orElseThrow(() -> new ApiException("Attempt not found"));
        if (attempt.getStatus() != QuizAttemptStatus.IN_PROGRESS) {
            throw new ApiException("Attempt has already been submitted");
        }

        Map<Long, QuizQuestion> questions = new HashMap<>();
        for (QuizQuestion question : attempt.getQuiz().getQuestions()) {
            questions.put(question.getId(), question);
        }
        Map<Long, QuizOption> selectedOptions = new HashMap<>();
        for (SubmitQuizRequest.AnswerRequest answer : request.answers()) {
            QuizQuestion question = questions.get(answer.questionId());
            if (question == null) {
                throw new ApiException("Answer contains a question outside this quiz");
            }
            if (selectedOptions.put(answer.questionId(), findOption(question, answer.optionId())) != null) {
                throw new ApiException("A question can only be answered once");
            }
        }

        int score = 0;
        for (QuizQuestion question : attempt.getQuiz().getQuestions()) {
            QuizOption option = selectedOptions.get(question.getId());
            QuizAnswer answer = new QuizAnswer();
            answer.setAttempt(attempt);
            answer.setQuestion(question);
            answer.setSelectedOption(option);
            int awarded = option != null && option.isCorrect() ? question.getPoints() : 0;
            answer.setAwardedPoints(awarded);
            attempt.getAnswers().add(answer);
            score += awarded;
        }

        Instant submittedAt = Instant.now();
        boolean expired = submittedAt.isAfter(attempt.getStartedAt()
                .plusSeconds(attempt.getQuiz().getDurationSeconds()));
        attempt.setScore(score);
        attempt.setMaxScore(maxScore(attempt.getQuiz()));
        attempt.setPercentage(percentage(score, attempt.getMaxScore()));
        attempt.setSubmittedAt(submittedAt);
        attempt.setStatus(expired ? QuizAttemptStatus.EXPIRED : QuizAttemptStatus.SUBMITTED);
        return toResultDto(attemptRepository.save(attempt));
    }

    @Transactional
    public QuizResultDTO submitOffline(OfflineQuizSubmissionDTO request, String studentEmail) {
        User student = findUser(studentEmail);
        requireStudent(student);

        if (attemptRepository.existsByClientUuid(request.clientUuid())) {
            QuizAttempt existing = attemptRepository.findByClientUuid(request.clientUuid())
                    .orElseThrow(() -> new ApiException("Offline submission already exists"));
            if (!existing.getStudent().getId().equals(student.getId())) {
                throw new ApiException("Offline submission belongs to another student");
            }
            return toResultDto(existing);
        }

        Quiz quiz = findQuiz(request.quizId());
        if (!quiz.isPublished()) {
            throw new ApiException("Quiz is not published");
        }
        if (student.getSchoolClass() == null
                || !student.getSchoolClass().getId().equals(quiz.getSchoolClass().getId())) {
            throw new ApiException("Quiz is not assigned to the student's class");
        }

        List<SubmitQuizRequest.AnswerRequest> answers = new ArrayList<>();
        request.answers().forEach((questionId, optionIds) -> {
            if (optionIds == null || optionIds.size() != 1 || optionIds.get(0) == null) {
                throw new ApiException("Each question must have exactly one selected option");
            }
            answers.add(new SubmitQuizRequest.AnswerRequest(questionId, optionIds.get(0)));
        });

        QuizAttempt attempt = new QuizAttempt();
        attempt.setQuiz(quiz);
        attempt.setStudent(student);
        attempt.setClientUuid(request.clientUuid());
        attempt.setStartedAt(Instant.now().minusSeconds(quiz.getDurationSeconds()));
        attempt.setMaxScore(maxScore(quiz));
        attempt.setStatus(QuizAttemptStatus.IN_PROGRESS);
        QuizAttempt saved = attemptRepository.save(attempt);
        return submitAttempt(saved.getId(), new SubmitQuizRequest(answers), studentEmail);
    }

    @Transactional(readOnly = true)
    public QuizResultDTO getResult(Long attemptId, String studentEmail) {
        User student = findUser(studentEmail);
        QuizAttempt attempt = attemptRepository.findByIdAndStudentId(attemptId, student.getId())
                .orElseThrow(() -> new ApiException("Attempt not found"));
        return toResultDto(attempt);
    }

    private Quiz findQuiz(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new ApiException("Quiz not found"));
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));
    }

    private void requireStudent(User user) {
        if (!user.getRole().name().equals("STUDENT")) {
            throw new ApiException("Only students can perform this action");
        }
    }

    private QuizOption findOption(QuizQuestion question, Long optionId) {
        return question.getOptions().stream()
                .filter(option -> option.getId().equals(optionId))
                .findFirst()
                .orElseThrow(() -> new ApiException("Option does not belong to the question"));
    }

    private int maxScore(Quiz quiz) {
        return quiz.getQuestions().stream().mapToInt(QuizQuestion::getPoints).sum();
    }

    private BigDecimal percentage(int score, int maxScore) {
        if (maxScore == 0) {
            return BigDecimal.ZERO;
        }
        return BigDecimal.valueOf(score)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(maxScore), 2, RoundingMode.HALF_UP);
    }

    private QuizDTO toDto(Quiz quiz) {
        return new QuizDTO(
                quiz.getId(), quiz.getTitle(), quiz.getDescription(), quiz.getDurationSeconds(),
                quiz.getSubject().getId(), quiz.getSubject().getName(), quiz.getSchoolClass().getId(),
                quiz.getSchoolClass().getName(), quiz.getSchoolClass().getSubsystem(), quiz.getAuthor().getName(),
                quiz.isPublished(), quiz.getCreatedAt(),
                quiz.getQuestions().stream()
                        .map(question -> new QuizDTO.QuestionDTO(question.getId(), question.getStatement(),
                                question.getPoints(),
                                question.getPosition(), question.getOptions().stream()
                                        .map(option -> new QuizDTO.OptionDTO(option.getId(), option.getLabel(),
                                                option.getPosition()))
                                        .toList()))
                        .toList());
    }

    private QuizAttemptDTO toAttemptDto(QuizAttempt attempt) {
        return new QuizAttemptDTO(attempt.getId(), toDto(attempt.getQuiz()), attempt.getStartedAt(),
                attempt.getStartedAt().plusSeconds(attempt.getQuiz().getDurationSeconds()), attempt.getStatus());
    }

    private QuizResultDTO toResultDto(QuizAttempt attempt) {
        return new QuizResultDTO(attempt.getId(), attempt.getQuiz().getId(), attempt.getStatus(),
                attempt.getScore(), attempt.getMaxScore(), attempt.getPercentage(), attempt.getStartedAt(),
                attempt.getSubmittedAt());
    }

    private String normalize(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}