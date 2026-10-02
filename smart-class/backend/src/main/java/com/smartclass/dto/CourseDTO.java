package com.smartclass.dto;

import com.smartclass.entity.CourseResourceType;
import com.smartclass.entity.EducationSubsystem;
import java.time.Instant;

public class CourseDTO {
    private Long id;
    private String title;
    private String description;
    private String contentText;
    private CourseResourceType resourceType;
    private Long subjectId;
    private String subjectName;
    private Long classId;
    private String className;
    private EducationSubsystem subsystem;
    private String authorName;
    private boolean published;
    private Instant createdAt;
    private String pdfUrl;

    public CourseDTO() {
    }

    public CourseDTO(
            Long id,
            String title,
            String description,
            String contentText,
            CourseResourceType resourceType,
            Long subjectId,
            String subjectName,
            Long classId,
            String className,
            EducationSubsystem subsystem,
            String authorName,
            boolean published,
            Instant createdAt,
            String pdfUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.contentText = contentText;
        this.resourceType = resourceType;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.classId = classId;
        this.className = className;
        this.subsystem = subsystem;
        this.authorName = authorName;
        this.published = published;
        this.createdAt = createdAt;
        this.pdfUrl = pdfUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public CourseResourceType getResourceType() {
        return resourceType;
    }

    public void setResourceType(CourseResourceType resourceType) {
        this.resourceType = resourceType;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public EducationSubsystem getSubsystem() {
        return subsystem;
    }

    public void setSubsystem(EducationSubsystem subsystem) {
        this.subsystem = subsystem;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }
}