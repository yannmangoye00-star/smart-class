package com.smartclass.dto;

import com.smartclass.entity.QuizAttemptStatus;
import java.time.Instant;

public record QuizAttemptDTO(
        Long attemptId,
        QuizDTO quiz,
        Instant startedAt,
        Instant deadline,
        QuizAttemptStatus status) {
}