package com.smartclass.service;

import com.smartclass.entity.Establishment;
import com.smartclass.repository.EstablishmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EstablishmentService {

    private final EstablishmentRepository establishmentRepository;
    private final DatabaseProvisioningService databaseProvisioningService;

    public Establishment create(
            String name,
            String code
    ) {

        String normalizedCode =
                code.trim().toLowerCase();

        if (establishmentRepository
                .existsByCode(normalizedCode)) {

            throw new IllegalArgumentException(
                    "Le code établissement existe déjà."
            );
        }

        String databaseName =
                "smartclass_" + normalizedCode;

        if (establishmentRepository
                .existsByDatabaseName(databaseName)) {

            throw new IllegalArgumentException(
                    "La base existe déjà."
            );
        }

        /*
         * Création physique de la base PostgreSQL
         */
        databaseProvisioningService
                .createDatabase(databaseName);

        /*
         * Enregistrement dans la base centrale
         */
        Establishment establishment =
                Establishment.builder()
                        .name(name)
                        .code(normalizedCode)
                        .databaseName(databaseName)
                        .databaseHost("localhost")
                        .databasePort(5432)
                        .databaseUsername("smartclass")
                        .databasePassword("smartclass")
                        .build();

        return establishmentRepository.save(
                establishment
        );
    }
}