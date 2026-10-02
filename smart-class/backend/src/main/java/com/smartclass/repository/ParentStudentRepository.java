package com.smartclass.repository;

import com.smartclass.entity.ParentStudent;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParentStudentRepository extends JpaRepository<ParentStudent, Long> {

    List<ParentStudent> findAllByParentId(Long parentId);

    List<ParentStudent> findAllByStudentId(Long studentId);

    Optional<ParentStudent> findByParentIdAndStudentId(Long parentId, Long studentId);

    boolean existsByParentIdAndStudentId(Long parentId, Long studentId);
}