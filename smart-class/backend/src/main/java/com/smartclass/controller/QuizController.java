package com.smartclass.controller;

import com.smartclass.dto.CreateQuizRequest;
import com.smartclass.dto.QuizAttemptDTO;
import com.smartclass.dto.QuizDTO;
import com.smartclass.dto.QuizResultDTO;
import com.smartclass.dto.OfflineQuizSubmissionDTO;
import com.smartclass.dto.SubmitQuizRequest;
import com.smartclass.entity.EducationSubsystem;
import com.smartclass.service.QuizService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'PARENT', 'ADMIN')")
    public ResponseEntity<List<QuizDTO>> findAll(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) EducationSubsystem subsystem) {
        return ResponseEntity.ok(quizService.findAll(userDetails.getUsername(), subsystem));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'PARENT', 'ADMIN')")
    public ResponseEntity<QuizDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    public ResponseEntity<QuizDTO> create(
            @Valid @RequestBody CreateQuizRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(quizService.create(request, userDetails.getUsername()));
    }

    @PostMapping("/{quizId}/attempts")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<QuizAttemptDTO> startAttempt(
            @PathVariable Long quizId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(quizService.startAttempt(quizId, userDetails.getUsername()));
    }

    @PostMapping("/submit-offline")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<QuizResultDTO> submitOffline(
            @Valid @RequestBody OfflineQuizSubmissionDTO request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(quizService.submitOffline(request, userDetails.getUsername()));
    }

    @PostMapping("/attempts/{attemptId}/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<QuizResultDTO> submit(
            @PathVariable Long attemptId,
            @Valid @RequestBody SubmitQuizRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(quizService.submitAttempt(attemptId, request, userDetails.getUsername()));
    }

    @GetMapping("/attempts/{attemptId}/result")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<QuizResultDTO> result(
            @PathVariable Long attemptId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(quizService.getResult(attemptId, userDetails.getUsername()));
    }
}