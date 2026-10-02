package com.smartclass.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "school_classes", 
    uniqueConstraints = @UniqueConstraint(
        name = "uk_school_classes_name_level", 
        columnNames = {"name", "level"}
    )
)
public class SchoolClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String level;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EducationSubsystem subsystem = EducationSubsystem.FRANCOPHONE;

    public SchoolClass() {
    }

    public SchoolClass(Long id, String name, String level, EducationSubsystem subsystem) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.subsystem = subsystem;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public EducationSubsystem getSubsystem() {
        return subsystem;
    }

    public void setSubsystem(EducationSubsystem subsystem) {
        this.subsystem = subsystem;
    }
}