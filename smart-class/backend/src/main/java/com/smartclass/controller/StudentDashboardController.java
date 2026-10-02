package com.smartclass.controller;

import com.smartclass.dto.StudentDashboardDTO;
import com.smartclass.service.StudentDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/students/me")
@RequiredArgsConstructor
public class StudentDashboardController {

    private final StudentDashboardService dashboardService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('STUDENT')")
    public StudentDashboardDTO dashboard(@AuthenticationPrincipal UserDetails userDetails) {
        return dashboardService.getDashboard(userDetails.getUsername());
    }
}