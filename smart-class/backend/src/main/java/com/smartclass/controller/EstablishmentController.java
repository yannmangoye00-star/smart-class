package com.smartclass.controller;

import com.smartclass.entity.Establishment;
import com.smartclass.repository.EstablishmentRepository;
import com.smartclass.service.DatabaseProvisioningService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/establishments")
public class EstablishmentController {

    private final EstablishmentRepository establishmentRepository;
    private final DatabaseProvisioningService databaseProvisioningService;

    public EstablishmentController(
            EstablishmentRepository establishmentRepository,
            DatabaseProvisioningService databaseProvisioningService
    ) {
        this.establishmentRepository = establishmentRepository;
        this.databaseProvisioningService = databaseProvisioningService;
    }

    /*
     * =========================================================
     * CREER UN ETABLISSEMENT
     * =========================================================
     */
    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody Establishment establishment
    ) {

        if (establishment.getName() == null
                || establishment.getName().isBlank()) {

            return ResponseEntity.badRequest().body(
                    Map.of("error", "Establishment name is required")
            );
        }

        if (establishment.getCode() == null
                || establishment.getCode().isBlank()) {

            return ResponseEntity.badRequest().body(
                    Map.of("error", "Establishment code is required")
            );
        }

        if (establishmentRepository.existsByCode(
                establishment.getCode())) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("error", "Establishment code already exists")
            );
        }

        if (establishment.getDatabaseName() == null
                || establishment.getDatabaseName().isBlank()) {

            return ResponseEntity.badRequest().body(
                    Map.of("error", "Database name is required")
            );
        }

        if (establishmentRepository.existsByDatabaseName(
                establishment.getDatabaseName())) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("error", "Database name already exists")
            );
        }

        /*
         * Création de la base de données
         * dédiée à l'établissement.
         */
        databaseProvisioningService.createDatabase(
                establishment.getDatabaseName()
        );

        Establishment saved =
                establishmentRepository.save(establishment);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    /*
     * =========================================================
     * LISTE DE TOUS LES ETABLISSEMENTS
     * =========================================================
     */
    @GetMapping
    public ResponseEntity<List<Establishment>> findAll() {

        return ResponseEntity.ok(
                establishmentRepository.findAll()
        );
    }

    /*
     * =========================================================
     * RECHERCHER UN ETABLISSEMENT PAR CODE
     * =========================================================
     */
    @GetMapping("/{code}")
    public ResponseEntity<?> findByCode(
            @PathVariable String code
    ) {

        return establishmentRepository.findByCode(code)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }
}