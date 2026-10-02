package com.smartclass.dto;

import com.smartclass.entity.EducationSubsystem;
import java.time.Instant;
import java.util.List;

public record QuizDTO(
        Long id,
        String title,
        String description,
        Integer durationSeconds,
        Long subjectId,
        String subjectName,
        Long classId,
        String className,
        EducationSubsystem subsystem,
        String authorName,
        boolean published,
        Instant createdAt,
        List<QuestionDTO> questions) {
    public record QuestionDTO(
            Long id,
            String statement,
            Integer points,
            Integer position,
            List<OptionDTO> options) {
    }

    public record OptionDTO(
            Long id,
            String label,
            Integer position) {
    }
}