package com.smartclass.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;

public record CreateQuizRequest(
        @NotBlank String title,
        String description,
        @NotNull @Positive Integer durationSeconds,
        @NotNull Long classId,
        @NotNull Long subjectId,
        @NotEmpty List<@Valid QuestionRequest> questions) {
    public record QuestionRequest(
            @NotBlank String statement,
            @NotNull @Positive Integer points,
            @NotNull @PositiveOrZero Integer position,
            @NotEmpty List<@Valid OptionRequest> options) {
    }

    public record OptionRequest(
            @NotBlank String label,
            @NotNull @PositiveOrZero Integer position,
            boolean correct) {
    }
}