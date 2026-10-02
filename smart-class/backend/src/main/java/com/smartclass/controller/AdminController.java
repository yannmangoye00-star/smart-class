package com.smartclass.controller;

import com.smartclass.dto.AdminUserDTO;
import com.smartclass.dto.SchoolClassRequest;
import com.smartclass.dto.SubjectRequest;
import com.smartclass.dto.UserRoleRequest;
import com.smartclass.entity.ParentStudent;
import com.smartclass.entity.SchoolClass;
import com.smartclass.entity.Subject;
import com.smartclass.entity.User;
import com.smartclass.entity.UserRole;
import com.smartclass.exception.ApiException;
import com.smartclass.repository.ParentStudentRepository;
import com.smartclass.repository.SchoolClassRepository;
import com.smartclass.repository.SubjectRepository;
import com.smartclass.repository.UserRepository;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final SchoolClassRepository schoolClassRepository;
    private final SubjectRepository subjectRepository;
    private final ParentStudentRepository parentStudentRepository;

    @GetMapping("/users")
    public List<AdminUserDTO> users() {
        return userRepository.findAll().stream().map(this::toUserDto).toList();
    }

    @PatchMapping("/users/{userId}/role")
    public AdminUserDTO updateRole(
            @PathVariable Long userId,
            @Valid @RequestBody UserRoleRequest request) {
        User user = findUser(userId);
        user.setRole(request.role());
        return toUserDto(userRepository.save(user));
    }

    @PatchMapping("/users/{userId}/enabled")
    public AdminUserDTO updateEnabled(
            @PathVariable Long userId,
            @RequestParam boolean enabled) {
        User user = findUser(userId);
        user.setEnabled(enabled);
        return toUserDto(userRepository.save(user));
    }

    @GetMapping("/classes")
    public List<SchoolClass> classes() {
        return schoolClassRepository.findAll();
    }

    @PostMapping("/classes")
    public ResponseEntity<SchoolClass> createClass(@Valid @RequestBody SchoolClassRequest request) {
        if (schoolClassRepository.existsByNameAndLevel(request.name().trim(), request.level().trim())) {
            throw new ApiException("Class already exists");
        }
        SchoolClass schoolClass = new SchoolClass();
        schoolClass.setName(request.name().trim());
        schoolClass.setLevel(request.level().trim());
        schoolClass.setSubsystem(request.subsystem());
        return ResponseEntity.status(HttpStatus.CREATED).body(schoolClassRepository.save(schoolClass));
    }

    @PutMapping("/classes/{classId}")
    public SchoolClass updateClass(
            @PathVariable Long classId,
            @Valid @RequestBody SchoolClassRequest request) {
        SchoolClass schoolClass = findClass(classId);
        schoolClass.setName(request.name().trim());
        schoolClass.setLevel(request.level().trim());
        schoolClass.setSubsystem(request.subsystem());
        return schoolClassRepository.save(schoolClass);
    }

    @DeleteMapping("/classes/{classId}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long classId) {
        schoolClassRepository.delete(findClass(classId));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/subjects")
    public List<Subject> subjects() {
        return subjectRepository.findAll();
    }

    @PostMapping("/subjects")
    public ResponseEntity<Subject> createSubject(@Valid @RequestBody SubjectRequest request) {
        SchoolClass schoolClass = findClass(request.classId());
        validateSubsystem(schoolClass, request.subsystem());
        if (subjectRepository.existsByNameAndSchoolClassId(request.name().trim(), schoolClass.getId())) {
            throw new ApiException("Subject already exists for this class");
        }
        Subject subject = new Subject();
        subject.setName(request.name().trim());
        subject.setSchoolClass(schoolClass);
        subject.setSubsystem(request.subsystem());
        return ResponseEntity.status(HttpStatus.CREATED).body(subjectRepository.save(subject));
    }

    @PutMapping("/subjects/{subjectId}")
    public Subject updateSubject(
            @PathVariable Long subjectId,
            @Valid @RequestBody SubjectRequest request) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ApiException("Subject not found"));
        SchoolClass schoolClass = findClass(request.classId());
        validateSubsystem(schoolClass, request.subsystem());
        subject.setName(request.name().trim());
        subject.setSchoolClass(schoolClass);
        subject.setSubsystem(request.subsystem());
        return subjectRepository.save(subject);
    }

    @DeleteMapping("/subjects/{subjectId}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ApiException("Subject not found"));
        subjectRepository.delete(subject);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/classes/{classId}/students/{studentId}")
    public AdminUserDTO assignStudentToClass(
            @PathVariable Long classId,
            @PathVariable Long studentId) {
        SchoolClass schoolClass = findClass(classId);
        User student = findUser(studentId);
        requireRole(student, UserRole.STUDENT);
        student.setSchoolClass(schoolClass);
        return toUserDto(userRepository.save(student));
    }

    @DeleteMapping("/classes/{classId}/students/{studentId}")
    public AdminUserDTO removeStudentFromClass(
            @PathVariable Long classId,
            @PathVariable Long studentId) {
        User student = findUser(studentId);
        requireRole(student, UserRole.STUDENT);
        if (student.getSchoolClass() == null || !student.getSchoolClass().getId().equals(classId)) {
            throw new ApiException("Student is not assigned to this class");
        }
        student.setSchoolClass(null);
        return toUserDto(userRepository.save(student));
    }

    @PutMapping("/parents/{parentId}/children/{studentId}")
    public ResponseEntity<Void> linkParentToChild(
            @PathVariable Long parentId,
            @PathVariable Long studentId) {
        User parent = findUser(parentId);
        User student = findUser(studentId);
        requireRole(parent, UserRole.PARENT);
        requireRole(student, UserRole.STUDENT);
        if (!parentStudentRepository.existsByParentIdAndStudentId(parentId, studentId)) {
            ParentStudent relation = new ParentStudent();
            relation.setParent(parent);
            relation.setStudent(student);
            parentStudentRepository.save(relation);
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/parents/{parentId}/children/{studentId}")
    public ResponseEntity<Void> unlinkParentFromChild(
            @PathVariable Long parentId,
            @PathVariable Long studentId) {
        ParentStudent relation = parentStudentRepository.findByParentIdAndStudentId(parentId, studentId)
                .orElseThrow(() -> new ApiException("Parent-child relation not found"));
        parentStudentRepository.delete(relation);
        return ResponseEntity.noContent().build();
    }

    private User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ApiException("User not found"));
    }

    private SchoolClass findClass(Long id) {
        return schoolClassRepository.findById(id)
                .orElseThrow(() -> new ApiException("Class not found"));
    }

    private void requireRole(User user, UserRole expected) {
        if (user.getRole() != expected) {
            throw new ApiException("User must have role " + expected);
        }
    }

    private void validateSubsystem(SchoolClass schoolClass, com.smartclass.entity.EducationSubsystem subsystem) {
        if (schoolClass.getSubsystem() != subsystem) {
            throw new ApiException("Subject subsystem must match the class subsystem");
        }
    }

    private AdminUserDTO toUserDto(User user) {
        return new AdminUserDTO(
                user.getId(), user.getName(), user.getEmail(), user.getRole(), user.isEnabled(),
                user.getSchoolClass() == null ? null : user.getSchoolClass().getId(),
                user.getSchoolClass() == null ? null : user.getSchoolClass().getName());
    }
}