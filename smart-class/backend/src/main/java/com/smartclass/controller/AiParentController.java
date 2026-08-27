package com.smartclass.controller;

import com.smartclass.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiParentController {

    private final AiService aiService;

    // Injection par constructeur
    public AiParentController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/parent-assistant")
    public ResponseEntity<Map<String, String>> askParentAssistant(@RequestBody ParentAiRequest request) {
        
        // Mock des données élèves (à lier à la BD JPA plus tard)
        String studentDataJson = """
            {
              "moyenneGenerale": "86%",
              "progression": {"Mathematiques": "89%", "Sciences": "76%"},
              "devoirsUrgents": 7,
              "enfantsSuivis": 2
            }
            """;

        // Récupération sécurisée du message utilisateur (prompt ou message)
        String userPrompt = request.getUserPrompt();
        if (userPrompt == null || userPrompt.isBlank()) {
            userPrompt = request.getMessage(); // Fallback si le front envoie "message"
        }
        if (userPrompt == null || userPrompt.isBlank()) {
            userPrompt = "Bonjour, donne-moi un résumé du suivi de mon enfant.";
        }

        String response = aiService.callParentAssistant(
            request.getParentName() != null ? request.getParentName() : "Parent",
            request.getStudentName() != null ? request.getStudentName() : "Marc Floyd",
            request.getStudentClass() != null ? request.getStudentClass() : "Terminale C",
            studentDataJson,
            userPrompt
        );

        return ResponseEntity.ok(Map.of("reply", response));
    }

    // DTO interne enrichi pour supporter toutes les variantes du frontend
    public static class ParentAiRequest {
        private String parentName;
        private String studentName;
        private String studentClass;
        private String userPrompt;
        private String message;

        public String getParentName() { return parentName; }
        public void setParentName(String parentName) { this.parentName = parentName; }

        public String getStudentName() { return studentName; }
        public void setStudentName(String studentName) { this.studentName = studentName; }

        public String getStudentClass() { return studentClass; }
        public void setStudentClass(String studentClass) { this.studentClass = studentClass; }

        public String getUserPrompt() { return userPrompt; }
        public void setUserPrompt(String userPrompt) { this.userPrompt = userPrompt; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}