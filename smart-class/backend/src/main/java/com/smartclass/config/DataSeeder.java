package com.smartclass.config;

import com.smartclass.entity.EducationSubsystem;
import com.smartclass.entity.ParentStudent;
import com.smartclass.entity.Quiz;
import com.smartclass.entity.QuizAttempt;
import com.smartclass.entity.QuizAttemptStatus;
import com.smartclass.entity.SchoolClass;
import com.smartclass.entity.Subject;
import com.smartclass.entity.User;
import com.smartclass.entity.UserRole;
import com.smartclass.repository.ParentStudentRepository;
import com.smartclass.repository.QuizAttemptRepository;
import com.smartclass.repository.QuizRepository;
import com.smartclass.repository.SchoolClassRepository;
import com.smartclass.repository.SubjectRepository;
import com.smartclass.repository.UserRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final SchoolClassRepository schoolClassRepository;
    private final SubjectRepository subjectRepository;
    private final ParentStudentRepository parentStudentRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${smartclass.seed.enabled:false}")
    private boolean seedEnabled;

    @Override
    @Transactional
    public void run(String... args) {
        if (!seedEnabled) {
            log.info("SmartClass demo data seeding is disabled.");
            return;
        }

        SchoolClass francophoneClass = ensureClass(
            "Terminale S", "Terminale", EducationSubsystem.FRANCOPHONE);
        SchoolClass anglophoneClass = ensureClass(
                "Form 5 Science", "Form 5", EducationSubsystem.ANGLOPHONE);

        ensureSubjects(francophoneClass, List.of(
            "Mathématiques", "Physique", "Chimie", "Informatique"));
        ensureSubjects(anglophoneClass, List.of("Mathematics", "English", "Physics"));

        User admin = ensureUser(
                "Administrateur de test", "admin@smartclass.local", "Admin123!", UserRole.ADMIN, null);
        User frenchTeacher = ensureUser(
                "Professeur FR", "teacher.fr@smartclass.local", "TeacherFR123!", UserRole.TEACHER,
                francophoneClass);
        User englishTeacher = ensureUser(
                "English Teacher", "teacher.en@smartclass.local", "TeacherEN123!", UserRole.TEACHER,
                anglophoneClass);
        User frenchStudent = ensureUser(
                "Eleve Francophone", "student.fr@smartclass.local", "StudentFR123!", UserRole.STUDENT,
                francophoneClass);
        User englishStudent = ensureUser(
                "English Student", "student.en@smartclass.local", "StudentEN123!", UserRole.STUDENT,
                anglophoneClass);
        User parent = ensureUser(
                "Parent de test", "parent@smartclass.local", "Parent123!", UserRole.PARENT, null);

        seedStudentQuizHistory(frenchStudent, francophoneClass);

        ensureParentLink(parent, frenchStudent);
        ensureParentLink(parent, englishStudent);

        log.info(
                "SmartClass demo data ready: admin={}, teachers={}, students={}, parent={}",
                admin.getEmail(),
                List.of(frenchTeacher.getEmail(), englishTeacher.getEmail()),
                List.of(frenchStudent.getEmail(), englishStudent.getEmail()),
                parent.getEmail());
    }

    private SchoolClass ensureClass(
            String name,
            String level,
            EducationSubsystem subsystem) {
        return schoolClassRepository.findByNameAndLevel(name, level)
                .map(existing -> {
                    if (existing.getSubsystem() != subsystem) {
                        existing.setSubsystem(subsystem);
                        return schoolClassRepository.save(existing);
                    }
                    return existing;
                })
                .orElseGet(() -> {
                    SchoolClass schoolClass = new SchoolClass();
                    schoolClass.setName(name);
                    schoolClass.setLevel(level);
                    schoolClass.setSubsystem(subsystem);
                    return schoolClassRepository.save(schoolClass);
                });
    }

    private void ensureSubjects(SchoolClass schoolClass, List<String> names) {
        for (String name : names) {
            subjectRepository.findByNameAndSchoolClassId(name, schoolClass.getId())
                    .map(existing -> {
                        if (existing.getSubsystem() != schoolClass.getSubsystem()) {
                            existing.setSubsystem(schoolClass.getSubsystem());
                            return subjectRepository.save(existing);
                        }
                        return existing;
                    })
                    .orElseGet(() -> {
                        Subject subject = new Subject();
                        subject.setName(name);
                        subject.setSchoolClass(schoolClass);
                        subject.setSubsystem(schoolClass.getSubsystem());
                        return subjectRepository.save(subject);
                    });
        }
    }

    private void seedStudentQuizHistory(User student, SchoolClass schoolClass) {
        Map<String, Subject> subjects = subjectRepository
                .findAllBySchoolClassId(schoolClass.getId())
                .stream()
                .collect(Collectors.toMap(Subject::getName, Function.identity()));
        Map<String, Integer> scores = Map.of(
                "Mathématiques", 72,
                "Physique", 61,
                "Chimie", 48,
                "Informatique", 83);

        scores.forEach((subjectName, score) -> {
            Subject subject = subjects.get(subjectName);
            Quiz quiz = ensureDemoQuiz(subject, frenchStudentTeacher(schoolClass), subjectName);
            String clientUuid = "seed-student-fr-" + subjectName.toLowerCase()
                    .replace("é", "e");
            if (quizAttemptRepository.existsByClientUuid(clientUuid)) {
                return;
            }

            Instant submittedAt = Instant.now().minusSeconds((long) (scores.size() - score) * 3600);
            QuizAttempt attempt = new QuizAttempt();
            attempt.setQuiz(quiz);
            attempt.setStudent(student);
            attempt.setClientUuid(clientUuid);
            attempt.setStartedAt(submittedAt.minusSeconds(quiz.getDurationSeconds()));
            attempt.setSubmittedAt(submittedAt);
            attempt.setScore(score);
            attempt.setMaxScore(100);
            attempt.setPercentage(BigDecimal.valueOf(score));
            attempt.setStatus(QuizAttemptStatus.SUBMITTED);
            quizAttemptRepository.save(attempt);
        });
    }

    private User frenchStudentTeacher(SchoolClass schoolClass) {
        return userRepository.findByEmail("teacher.fr@smartclass.local")
                .orElseThrow(() -> new IllegalStateException(
                        "Seed teacher is missing for class " + schoolClass.getName()));
    }

    private Quiz ensureDemoQuiz(Subject subject, User author, String subjectName) {
        String title = "Quiz de démonstration - " + subjectName;
        return quizRepository.findAllByPublishedTrueAndSchoolClassIdAndSubjectIdOrderByCreatedAtDesc(
                        subject.getSchoolClass().getId(), subject.getId())
                .stream()
                .filter(quiz -> quiz.getTitle().equals(title))
                .findFirst()
                .orElseGet(() -> {
                    Quiz quiz = new Quiz();
                    quiz.setTitle(title);
                    quiz.setDescription("Quiz de données de démonstration");
                    quiz.setDurationSeconds(1800);
                    quiz.setPublished(true);
                    quiz.setSubject(subject);
                    quiz.setSchoolClass(subject.getSchoolClass());
                    quiz.setAuthor(author);
                    return quizRepository.save(quiz);
                });
    }

    private User ensureUser(
            String name,
            String email,
            String rawPassword,
            UserRole role,
            SchoolClass schoolClass) {
        return userRepository.findByEmail(email)
                .map(existing -> {
                    existing.setName(name);
                    existing.setRole(role);
                    existing.setSchoolClass(schoolClass);
                    existing.setEnabled(true);
                    existing.setEmailVerified(true);
                    return userRepository.save(existing);
                })
                .orElseGet(() -> {
                    User user = new User();
                    user.setName(name);
                    user.setEmail(email);
                    user.setPassword(passwordEncoder.encode(rawPassword));
                    user.setRole(role);
                    user.setSchoolClass(schoolClass);
                    user.setEnabled(true);
                    user.setEmailVerified(true);
                    return userRepository.save(user);
                });
    }

    private void ensureParentLink(User parent, User student) {
        if (parentStudentRepository.existsByParentIdAndStudentId(parent.getId(), student.getId())) {
            return;
        }

        ParentStudent relation = new ParentStudent();
        relation.setParent(parent);
        relation.setStudent(student);
        parentStudentRepository.save(relation);
    }
}
