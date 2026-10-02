package com.smartclass.dto;

import com.smartclass.entity.UserRole;

public record AdminUserDTO(
        Long id,
        String name,
        String email,
        UserRole role,
        boolean enabled,
        Long classId,
        String className) {
}