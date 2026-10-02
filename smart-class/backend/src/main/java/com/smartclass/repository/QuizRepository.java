package com.smartclass.repository;

import com.smartclass.entity.Quiz;
import com.smartclass.entity.EducationSubsystem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    List<Quiz> findAllByPublishedTrueOrderByCreatedAtDesc();

    List<Quiz> findAllByPublishedTrueAndSchoolClassIdOrderByCreatedAtDesc(Long schoolClassId);

    List<Quiz> findAllByPublishedTrueAndSchoolClassSubsystemOrderByCreatedAtDesc(
            EducationSubsystem subsystem);

    List<Quiz> findAllByPublishedTrueAndSchoolClassIdAndSubjectIdOrderByCreatedAtDesc(
            Long schoolClassId,
            Long subjectId);

    List<Quiz> findAllByPublishedTrueAndSchoolClassIdAndSchoolClassSubsystemOrderByCreatedAtDesc(
            Long schoolClassId,
            EducationSubsystem subsystem);
}