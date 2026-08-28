package com.smartclass.dto;

public class CourseDTO {
    private Long id;
    private String title;
    private String classLevel;
    private String fileUrl;

    public CourseDTO() {}

    public CourseDTO(Long id, String title, String classLevel, String fileUrl) {
        this.id = id;
        this.title = title;
        this.classLevel = classLevel;
        this.fileUrl = fileUrl;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getClassLevel() { return classLevel; }
    public void setClassLevel(String classLevel) { this.classLevel = classLevel; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
}