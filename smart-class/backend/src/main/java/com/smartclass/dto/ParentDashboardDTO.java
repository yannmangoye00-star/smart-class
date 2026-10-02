package com.smartclass.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record ParentDashboardDTO(
        StudentSummary student,
        BigDecimal averageScore,
        List<SubjectPerformance> subjectPerformance,
        List<QuizHistory> quizHistory) {

    public record StudentSummary(Long id, String name, String email, String className) {
    }

    public record SubjectPerformance(
            Long subjectId,
            String subjectName,
            BigDecimal successRate,
            long quizCount) {
    }

    public record QuizHistory(
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