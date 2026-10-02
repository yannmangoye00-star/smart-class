package com.smartclass.repository;

import com.smartclass.entity.Course;
import com.smartclass.entity.EducationSubsystem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findAllByPublishedTrueOrderByCreatedAtDesc();

    List<Course> findAllByPublishedTrueAndSchoolClassIdOrderByCreatedAtDesc(Long schoolClassId);

    List<Course> findAllByPublishedTrueAndSchoolClassSubsystemOrderByCreatedAtDesc(
            EducationSubsystem subsystem);

    List<Course> findAllByPublishedTrueAndSchoolClassIdAndSchoolClassSubsystemOrderByCreatedAtDesc(
            Long schoolClassId,
            EducationSubsystem subsystem);
}