package com.smartclass.controller;

import com.smartclass.dto.ParentDashboardDTO;
import com.smartclass.service.ParentDashboardService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/parents/me")
@RequiredArgsConstructor
public class ParentDashboardController {

    private final ParentDashboardService dashboardService;

    @GetMapping("/children")
    @PreAuthorize("hasRole('PARENT')")
    public List<ParentDashboardDTO.StudentSummary> children(
            @AuthenticationPrincipal UserDetails userDetails) {
        return dashboardService.children(userDetails.getUsername());
    }

    @GetMapping("/children/{studentId}/dashboard")
    @PreAuthorize("hasRole('PARENT')")
    public ParentDashboardDTO dashboard(
            @PathVariable Long studentId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return dashboardService.getDashboard(userDetails.getUsername(), studentId);
    }
}