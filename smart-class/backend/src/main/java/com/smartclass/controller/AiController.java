package com.smartclass.controller;

import com.smartclass.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    // 1. Tuteur Élève (Acceptation flexible 'prompt' ou 'message')
    @PostMapping("/tutor")
    public ResponseEntity<?> askTutor(@RequestBody(required = false) Map<String, Object> payload) {
        try {
            String userQuestion = "";

            if (payload != null) {
                if (payload.containsKey("prompt") && payload.get("prompt") != null) {
                    userQuestion = payload.get("prompt").toString();
                } else if (payload.containsKey("message") && payload.get("message") != null) {
                    userQuestion = payload.get("message").toString();
                }
            }

            if (userQuestion.isBlank()) {
                userQuestion = "Bonjour ! Présente-toi brièvement.";
            }

            String systemPrompt = "Tu es un tuteur pédagogique bienveillant et clair pour l'application Smart Classe. Réponds de façon concise et adaptée aux élèves.";
            String aiReply = aiService.callOpenAi(systemPrompt, userQuestion);

            return ResponseEntity.ok(Map.of(
                "response", aiReply,
                "reply", aiReply
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Erreur serveur : " + e.getMessage()));
        }
    }

    // 2. Générateur de Quiz Enseignant
    @PostMapping("/generate-quiz")
    public ResponseEntity<?> generateQuiz(@RequestBody Map<String, Object> payload) {
        String topic = payload.getOrDefault("topic", "Général").toString();
        String systemPrompt = "Tu es un enseignant. Génère un mini-quiz de 3 questions à choix multiples (A, B, C) avec leurs réponses.";
        String quiz = aiService.callOpenAi(systemPrompt, "Génère un quiz sur : " + topic);

        return ResponseEntity.ok(Map.of("quiz", quiz));
    }

    // 3. Prédiction Décrochage Admin
    @GetMapping("/predict-dropout")
    public ResponseEntity<?> predictDropout() {
        return ResponseEntity.ok(Map.of(
            "atRiskStudentsCount", 3,
            "details", "3 élèves présentent un taux d'absence supérieur à 25%."
        ));
    }
}