package com.smartclass.service;

import com.smartclass.dto.ParentDashboardDTO;
import com.smartclass.entity.ParentStudent;
import com.smartclass.entity.QuizAttempt;
import com.smartclass.entity.QuizAttemptStatus;
import com.smartclass.entity.User;
import com.smartclass.exception.ApiException;
import com.smartclass.repository.ParentStudentRepository;
import com.smartclass.repository.QuizAttemptRepository;
import com.smartclass.repository.UserRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ParentDashboardService {

    private final UserRepository userRepository;
    private final ParentStudentRepository parentStudentRepository;
    private final QuizAttemptRepository attemptRepository;

    @Transactional(readOnly = true)
    public List<ParentDashboardDTO.StudentSummary> children(String parentEmail) {
        User parent = findParent(parentEmail);
        return parentStudentRepository.findAllByParentId(parent.getId()).stream()
                .map(ParentStudent::getStudent)
                .map(this::toStudentSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public ParentDashboardDTO getDashboard(String parentEmail, Long studentId) {
        User parent = findParent(parentEmail);
        ParentStudent relation = parentStudentRepository.findByParentIdAndStudentId(parent.getId(), studentId)
                .orElseThrow(() -> new ApiException("Student is not linked to this parent"));
        User student = relation.getStudent();
        List<QuizAttempt> attempts = attemptRepository.findAllByStudentIdAndStatusInOrderBySubmittedAtDesc(
                studentId, List.of(QuizAttemptStatus.SUBMITTED, QuizAttemptStatus.EXPIRED));

        BigDecimal average = average(attempts);
        Map<Long, List<QuizAttempt>> bySubject = new LinkedHashMap<>();
        attempts.forEach(attempt -> bySubject.computeIfAbsent(
                attempt.getQuiz().getSubject().getId(), key -> new java.util.ArrayList<>()).add(attempt));

        List<ParentDashboardDTO.SubjectPerformance> performance = bySubject.values().stream()
                .map(subjectAttempts -> {
                    QuizAttempt first = subjectAttempts.get(0);
                    return new ParentDashboardDTO.SubjectPerformance(
                            first.getQuiz().getSubject().getId(),
                            first.getQuiz().getSubject().getName(),
                            average(subjectAttempts),
                            subjectAttempts.size());
                })
                .toList();

        List<ParentDashboardDTO.QuizHistory> history = attempts.stream()
                .map(attempt -> new ParentDashboardDTO.QuizHistory(
                        attempt.getId(), attempt.getQuiz().getId(), attempt.getQuiz().getTitle(),
                        attempt.getQuiz().getSubject().getName(), attempt.getScore(), attempt.getMaxScore(),
                        attempt.getPercentage(), attempt.getSubmittedAt()))
                .toList();

        return new ParentDashboardDTO(toStudentSummary(student), average, performance, history);
    }

    private User findParent(String email) {
        User parent = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("Parent not found"));
        if (!parent.getRole().name().equals("PARENT")) {
            throw new ApiException("Only parents can access this dashboard");
        }
        return parent;
    }

    private ParentDashboardDTO.StudentSummary toStudentSummary(User student) {
        return new ParentDashboardDTO.StudentSummary(
                student.getId(), student.getName(), student.getEmail(),
                student.getSchoolClass() == null ? null : student.getSchoolClass().getName());
    }

    private BigDecimal average(List<QuizAttempt> attempts) {
        if (attempts.isEmpty()) {
            return BigDecimal.ZERO;
        }
        return attempts.stream()
                .map(QuizAttempt::getPercentage)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(BigDecimal.valueOf(attempts.size()), 2, RoundingMode.HALF_UP);
    }
}