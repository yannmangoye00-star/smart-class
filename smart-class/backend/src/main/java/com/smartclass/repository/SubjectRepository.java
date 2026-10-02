package com.smartclass.repository;

import com.smartclass.entity.Subject;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    List<Subject> findAllBySchoolClassId(Long schoolClassId);

    List<Subject> findAllBySchoolClassIdOrderByNameAsc(Long schoolClassId);

    Optional<Subject> findByNameAndSchoolClassId(String name, Long schoolClassId);

    boolean existsByNameAndSchoolClassId(String name, Long schoolClassId);
}