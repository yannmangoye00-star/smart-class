package com.smartclass.controller;

import com.smartclass.dto.StudentStatsDTO;
import com.smartclass.service.StudentStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/students/me")
@RequiredArgsConstructor
public class StudentStatsController {

    private final StudentStatsService statsService;

    @GetMapping("/stats")
    @PreAuthorize("hasRole('STUDENT')")
    public StudentStatsDTO stats(@AuthenticationPrincipal UserDetails userDetails) {
        return statsService.getStats(userDetails.getUsername());
    }
}