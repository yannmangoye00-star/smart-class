package com.smartclass.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record StudentDashboardDTO(
        BigDecimal averageScore,
        List<CourseSummary> recentCourses,
        List<QuizSummary> upcomingQuizzes,
        List<ScoreHistory> scoreHistory) {

    public record CourseSummary(Long id, String title, String subjectName, Instant createdAt) {
    }

    public record QuizSummary(
            Long id,
            String title,
            String subjectName,
            Integer durationSeconds,
            Instant createdAt) {
    }

    public record ScoreHistory(
            Long attemptId,
            Long quizId,
            String quizTitle,
            String subjectName,
            Integer score,
            Integer maxScore,
            BigDecimal percentage,
            Instant submittedAt) {
    }
}