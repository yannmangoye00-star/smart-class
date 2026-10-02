package com.smartclass.dto;

import com.smartclass.entity.UserRole;
import jakarta.validation.constraints.NotNull;

public record UserRoleRequest(@NotNull UserRole role) {
}