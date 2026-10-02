package com.smartclass.dto;

import java.util.List;

public record OfflineCourseBundleDTO(
        CourseDTO course,
        List<LessonDTO> lessons,
        List<ResourceDTO> resources,
        List<QuizDTO> quizzes) {

    public record LessonDTO(Long id, String title, String content) {
    }

    public record ResourceDTO(String name, String type, String url, String content) {
    }
}