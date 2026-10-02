package com.smartclass.service;

import com.smartclass.dto.StudentStatsDTO;
import com.smartclass.entity.QuizAttempt;
import com.smartclass.entity.QuizAttemptStatus;
import com.smartclass.entity.User;
import com.smartclass.exception.ApiException;
import com.smartclass.repository.QuizAttemptRepository;
import com.smartclass.repository.UserRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudentStatsService {

    private static final double WEAK_SUBJECT_THRESHOLD = 60.0;

    private final UserRepository userRepository;
    private final QuizAttemptRepository attemptRepository;

    @Transactional(readOnly = true)
    public StudentStatsDTO getStats(String email) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("Student not found"));
        if (student.getRole().name().equals("STUDENT") == false) {
            throw new ApiException("Only students can access these statistics");
        }

        List<QuizAttempt> attempts = completedAttempts(student.getId());
        Map<String, List<Double>> scoresBySubject = new LinkedHashMap<>();
        List<StudentStatsDTO.QuizHistory> quizHistory = new ArrayList<>();
        int totalStudyTimeMinutes = 0;

        for (QuizAttempt attempt : attempts) {
            double percentage = percentage(attempt);
            String subjectName = attempt.getQuiz().getSubject().getName();
            scoresBySubject.computeIfAbsent(subjectName, ignored -> new ArrayList<>()).add(percentage);
            totalStudyTimeMinutes += studyTimeMinutes(attempt);
            quizHistory.add(new StudentStatsDTO.QuizHistory(
                    attempt.getId(),
                    attempt.getQuiz().getTitle(),
                    subjectName,
                    attempt.getScore(),
                    attempt.getMaxScore(),
                    BigDecimal.valueOf(percentage).setScale(2, RoundingMode.HALF_UP),
                    attempt.getSubmittedAt()));
        }

        Map<String, Double> subjectScores = new LinkedHashMap<>();
        List<String> weakSubjects = new ArrayList<>();
        for (Map.Entry<String, List<Double>> entry : scoresBySubject.entrySet()) {
            double subjectScore = average(entry.getValue());
            subjectScores.put(entry.getKey(), subjectScore);
            if (subjectScore < WEAK_SUBJECT_THRESHOLD) {
                weakSubjects.add(entry.getKey());
            }
        }

        double globalScore = attempts.stream()
                .mapToDouble(this::percentage)
                .average()
                .orElse(0.0);
        globalScore = round(globalScore);

        return new StudentStatsDTO(
                globalScore,
                totalStudyTimeMinutes,
                globalScore,
                subjectScores,
                weakSubjects,
                quizHistory);
    }

    private List<QuizAttempt> completedAttempts(Long studentId) {
        return attemptRepository.findAllByStudentIdAndStatusInOrderBySubmittedAtDesc(
                studentId, List.of(QuizAttemptStatus.SUBMITTED, QuizAttemptStatus.EXPIRED));
    }

    private double percentage(QuizAttempt attempt) {
        if (attempt.getPercentage() != null) {
            return attempt.getPercentage().doubleValue();
        }
        if (attempt.getMaxScore() == null || attempt.getMaxScore() == 0) {
            return 0.0;
        }
        return attempt.getScore() * 100.0 / attempt.getMaxScore();
    }

    private int studyTimeMinutes(QuizAttempt attempt) {
        if (attempt.getStartedAt() == null || attempt.getSubmittedAt() == null) {
            return durationMinutes(attempt);
        }
        long elapsedSeconds = Math.max(0, Duration.between(
                attempt.getStartedAt(), attempt.getSubmittedAt()).getSeconds());
        long allowedSeconds = Math.max(0, attempt.getQuiz().getDurationSeconds());
        return (int) (Math.min(elapsedSeconds, allowedSeconds) / 60);
    }

    private int durationMinutes(QuizAttempt attempt) {
        return Math.max(0, attempt.getQuiz().getDurationSeconds()) / 60;
    }

    private double average(List<Double> values) {
        return round(values.stream().mapToDouble(Double::doubleValue).average().orElse(0.0));
    }

    private double round(double value) {
        return BigDecimal.valueOf(value).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }
}