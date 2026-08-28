package com.smartclass.service;

import com.smartclass.dto.CourseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    public List<CourseDTO> findAll() {
        // Logique pour récupérer la liste des cours
        return new ArrayList<>();
    }

    public CourseDTO saveCourse(String title, String classLevel, MultipartFile file) {
        // Logique d'enregistrement du cours et de sauvegarde du fichier
        return new CourseDTO(1L, title, classLevel, null);
    }

    public void delete(Long id) {
        // Logique de suppression d'un cours par ID
    }
}