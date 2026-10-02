package com.smartclass.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

public record OfflineQuizSubmissionDTO(
        @NotBlank String clientUuid,
        @NotNull Long quizId,
        @NotEmpty Map<Long, List<Long>> answers) {
}