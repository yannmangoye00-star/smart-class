package com.smartclass.repository;

import com.smartclass.entity.SchoolClass;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {

    Optional<SchoolClass> findByNameAndLevel(String name, String level);

    boolean existsByNameAndLevel(String name, String level);
}