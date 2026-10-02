package com.smartclass.dto;

import com.smartclass.entity.EducationSubsystem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SchoolClassRequest(
        @NotBlank String name,
        @NotBlank String level,
        @NotNull EducationSubsystem subsystem) {
}