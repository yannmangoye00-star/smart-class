package com.smartclass.service;

import org.springframework.stereotype.Service;

@Service
public class DatabaseNameGenerator {

    public String generate(String establishmentCode) {

        if (establishmentCode == null || establishmentCode.isBlank()) {
            throw new IllegalArgumentException(
                    "Le code de l'établissement est obligatoire."
            );
        }

        String normalized = establishmentCode
                .trim()
                .toLowerCase()
                .replaceAll("[^a-z0-9_]", "_");

        return "smartclass_" + normalized;
    }
}