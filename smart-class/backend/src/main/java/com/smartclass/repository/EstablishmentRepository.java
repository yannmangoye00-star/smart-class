package com.smartclass.repository;

import com.smartclass.entity.Establishment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstablishmentRepository extends JpaRepository<Establishment, Long> {

    Optional<Establishment> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Establishment> findByCode(String code);

    boolean existsByCode(String code);

    boolean existsByDatabaseName(String databaseName);
}