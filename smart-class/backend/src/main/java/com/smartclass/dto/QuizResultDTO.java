package com.smartclass.dto;

import com.smartclass.entity.QuizAttemptStatus;
import java.math.BigDecimal;
import java.time.Instant;

public record QuizResultDTO(
        Long attemptId,
        Long quizId,
        QuizAttemptStatus status,
        Integer score,
        Integer maxScore,
        BigDecimal percentage,
        Instant startedAt,
        Instant submittedAt) {
}