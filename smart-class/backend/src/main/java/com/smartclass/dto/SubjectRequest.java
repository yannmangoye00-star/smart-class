package com.smartclass.dto;

import com.smartclass.entity.EducationSubsystem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SubjectRequest(
        @NotBlank String name,
        @NotNull Long classId,
        @NotNull EducationSubsystem subsystem) {
}