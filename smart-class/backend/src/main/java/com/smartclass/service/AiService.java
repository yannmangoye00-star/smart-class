package com.smartclass.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiService {

    @Value("${groq.api.key:NON_DEFINIE}")
    private String groqApiKey;

    @Value("${groq.ai.model:llama-3.3-70b-versatile}")
    private String groqModel;

    private static final String GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

    @PostConstruct
    public void init() {
        if (groqApiKey != null) {
            groqApiKey = groqApiKey.trim().replaceAll("^\"|\"$", "");
        }
        
        if ("NON_DEFINIE".equals(groqApiKey) || groqApiKey.isBlank()) {
            System.err.println("❌ [AiService] ERREUR : La clé groq.api.key n'est pas injectée correctement !");
        } else {
            System.out.println("✅ [AiService] Clé Groq chargée avec succès (début : " 
                + groqApiKey.substring(0, Math.min(8, groqApiKey.length())) + "...)");
            System.out.println("🤖 [AiService] Modèle configuré : " + groqModel);
        }
    }

    /**
     * Méthode générique d'appel à l'API Groq (OpenAI-compatible)
     */
    public String callOpenAi(String systemPrompt, String userPrompt) {
        String cleanKey = (groqApiKey != null) ? groqApiKey.trim().replaceAll("^\"|\"$", "") : "";
        
        if (cleanKey.isBlank() || "NON_DEFINIE".equals(cleanKey)) {
            System.err.println("❌ [AiService] Clé API absente lors de l'appel.");
            return "Désolé, la clé API Groq n'est pas configurée correctement.";
        }

        try {
            SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
            factory.setConnectTimeout(10000);
            factory.setReadTimeout(10000);
            RestTemplate restTemplate = new RestTemplate(factory);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(cleanKey);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", groqModel.trim());
            requestBody.put("messages", List.of(
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", userPrompt)
            ));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(GROQ_URL, entity, Map.class);

            if (response.getBody() != null && response.getBody().containsKey("choices")) {
                List choices = (List) response.getBody().get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map firstChoice = (Map) choices.get(0);
                    Map message = (Map) firstChoice.get("message");
                    return message.get("content").toString();
                }
            }
        } catch (HttpStatusCodeException e) {
            System.err.println("❌ [AiService] Erreur HTTP Groq (" + e.getStatusCode() + ") : " + e.getResponseBodyAsString());
            return "Désolé, une erreur technique s'est produite lors de la connexion à l'IA.";
        } catch (Exception e) {
            System.err.println("❌ [AiService] Erreur d'appel API : " + e.getMessage());
            e.printStackTrace();
            return "Désolé, une erreur technique s'est produite lors de la connexion à l'IA.";
        }

        return "Aucune réponse générée.";
    }

    /**
     * Méthode spécialisée pour l'Assistant IA de l'Espace Parent
     */
    public String callParentAssistant(String parentName, String studentName, String studentClass, String studentDataJson, String userPrompt) {
        String parentSystemPrompt = String.format("""
            Tu es l'Assistant IA de Smart Classe, un conseiller pédagogique bienveillant et synthétique dédié aux parents.
            Tu t'adresses au parent nommé %s. Son enfant s'appelle %s, inscrit(e) en classe de %s.
            
            DONNÉES DE L'ÉLÈVE :
            %s
            
            CONSIGNES :
            - Réponds aux questions du parent en t'appuyant uniquement sur les données de l'élève fournies.
            - Sois constructif, encourageant et donne des conseils pratiques de suivi à la maison.
            - Utilise du formatage Markdown clair (puces, gras) sans utiliser de structures complexes.
            """, parentName, studentName, studentClass, studentDataJson);

        return callOpenAi(parentSystemPrompt, userPrompt);
    }
}