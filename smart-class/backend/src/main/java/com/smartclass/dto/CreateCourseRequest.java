package com.smartclass.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateCourseRequest(
        @NotBlank String title,
        String description,
        String contentText,
        @NotNull Long classId,
        @NotNull Long subjectId) {
}