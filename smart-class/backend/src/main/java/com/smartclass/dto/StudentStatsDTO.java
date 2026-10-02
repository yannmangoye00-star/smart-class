package com.smartclass.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;

public record StudentStatsDTO(
        Double globalScore,
        Integer totalStudyTimeMinutes,
        Double overallProgress,
        Map<String, Double> subjectScores,
        List<String> weakSubjects,
        List<QuizHistory> quizHistory) {

    public record QuizHistory(
            Long attemptId,
            String quizTitle,
            String subjectName,
            Integer score,
            Integer maxScore,
            BigDecimal percentage,
            Instant submittedAt) {
    }
}