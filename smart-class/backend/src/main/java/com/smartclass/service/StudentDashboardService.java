package com.smartclass.service;

import com.smartclass.dto.StudentDashboardDTO;
import com.smartclass.entity.QuizAttempt;
import com.smartclass.entity.QuizAttemptStatus;
import com.smartclass.entity.User;
import com.smartclass.exception.ApiException;
import com.smartclass.repository.CourseRepository;
import com.smartclass.repository.QuizAttemptRepository;
import com.smartclass.repository.QuizRepository;
import com.smartclass.repository.UserRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudentDashboardService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final QuizRepository quizRepository;
    private final QuizAttemptRepository attemptRepository;

    @Transactional(readOnly = true)
    public StudentDashboardDTO getDashboard(String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("Student not found"));
        if (student.getRole().name().equals("STUDENT") == false) {
            throw new ApiException("Only students can access this dashboard");
        }
        if (student.getSchoolClass() == null) {
            throw new ApiException("Student is not assigned to a class");
        }

        List<StudentDashboardDTO.CourseSummary> courses = courseRepository
                .findAllByPublishedTrueAndSchoolClassIdOrderByCreatedAtDesc(student.getSchoolClass().getId())
                .stream()
                .limit(5)
                .map(course -> new StudentDashboardDTO.CourseSummary(
                        course.getId(), course.getTitle(), course.getSubject().getName(), course.getCreatedAt()))
                .toList();

        List<StudentDashboardDTO.QuizSummary> quizzes = quizRepository
                .findAllByPublishedTrueAndSchoolClassIdOrderByCreatedAtDesc(student.getSchoolClass().getId())
                .stream()
                .limit(5)
                .map(quiz -> new StudentDashboardDTO.QuizSummary(
                        quiz.getId(), quiz.getTitle(), quiz.getSubject().getName(),
                        quiz.getDurationSeconds(), quiz.getCreatedAt()))
                .toList();

        List<QuizAttempt> attempts = completedAttempts(student.getId());
        BigDecimal average = attempts.isEmpty()
                ? BigDecimal.ZERO
                : attempts.stream()
                        .map(QuizAttempt::getPercentage)
                        .reduce(BigDecimal.ZERO, BigDecimal::add)
                        .divide(BigDecimal.valueOf(attempts.size()), 2, RoundingMode.HALF_UP);

        List<StudentDashboardDTO.ScoreHistory> history = attempts.stream()
                .map(attempt -> new StudentDashboardDTO.ScoreHistory(
                        attempt.getId(), attempt.getQuiz().getId(), attempt.getQuiz().getTitle(),
                        attempt.getQuiz().getSubject().getName(), attempt.getScore(), attempt.getMaxScore(),
                        attempt.getPercentage(), attempt.getSubmittedAt()))
                .toList();

        return new StudentDashboardDTO(average, courses, quizzes, history);
    }

    private List<QuizAttempt> completedAttempts(Long studentId) {
        return attemptRepository.findAllByStudentIdAndStatusInOrderBySubmittedAtDesc(
                studentId, List.of(QuizAttemptStatus.SUBMITTED, QuizAttemptStatus.EXPIRED));
    }
}