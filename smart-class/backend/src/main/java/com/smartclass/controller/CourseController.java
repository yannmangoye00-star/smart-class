package com.smartclass.controller;

import com.smartclass.dto.CreateCourseRequest;
import com.smartclass.dto.CourseDTO;
import com.smartclass.dto.OfflineCourseBundleDTO;
import com.smartclass.entity.EducationSubsystem;
import com.smartclass.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'PARENT', 'ADMIN')")
    public ResponseEntity<List<CourseDTO>> getAllCourses(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) EducationSubsystem subsystem) {
        return ResponseEntity.ok(courseService.findAll(userDetails.getUsername(), subsystem));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'PARENT', 'ADMIN')")
    public ResponseEntity<CourseDTO> getCourse(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.findById(id));
    }

    @GetMapping("/{id}/offline-bundle")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<OfflineCourseBundleDTO> getOfflineBundle(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getOfflineBundle(id));
    }

    @GetMapping("/{id}/pdf")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'PARENT', 'ADMIN')")
    public ResponseEntity<byte[]> getCoursePdf(@PathVariable Long id) {
        var course = courseService.findCourse(id);
        if (course.getPdfContent() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header("Content-Disposition", "inline; filename=\"" + course.getPdfFileName() + "\"")
                .body(course.getPdfContent());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    public ResponseEntity<CourseDTO> createCourse(
            @Valid @ModelAttribute CreateCourseRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails) {
        CourseDTO created = courseService.saveCourse(request, file, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    public ResponseEntity<Void> deleteCourse(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        boolean admin = userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
        courseService.delete(id, userDetails.getUsername(), admin);
        return ResponseEntity.noContent().build();
    }
}