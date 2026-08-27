package com.smartclass.dto; // 👈 Enlève le 'e' à smartclasse

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiRequest {

    @Size(max = 2000, message = "La question ne doit pas dépasser 2000 caractères")
    private String prompt;

    @Size(max = 2000, message = "La question ne doit pas dépasser 2000 caractères")
    private String question;

    /**
     * Getter personnalisé : renvoie 'prompt' prioritairement, sinon 'question'.
     */
    public String getPrompt() {
        if (prompt != null && !prompt.isBlank()) {
            return prompt;
        }
        return question;
    }
}