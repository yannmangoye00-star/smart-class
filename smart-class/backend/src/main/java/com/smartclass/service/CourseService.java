package com.smartclass.service;

import com.smartclass.dto.CreateCourseRequest;
import com.smartclass.dto.CourseDTO;
import com.smartclass.dto.OfflineCourseBundleDTO;
import com.smartclass.dto.QuizDTO;
import com.smartclass.entity.Course;
import com.smartclass.entity.CourseResourceType;
import com.smartclass.entity.EducationSubsystem;
import com.smartclass.entity.SchoolClass;
import com.smartclass.entity.Subject;
import com.smartclass.entity.User;
import com.smartclass.exception.ApiException;
import com.smartclass.repository.CourseRepository;
import com.smartclass.repository.QuizRepository;
import com.smartclass.repository.SchoolClassRepository;
import com.smartclass.repository.SubjectRepository;
import com.smartclass.repository.UserRepository;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final SchoolClassRepository schoolClassRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;
    private final QuizRepository quizRepository;

    @Transactional(readOnly = true)
    public List<CourseDTO> findAll(String requesterEmail, EducationSubsystem subsystem) {
        User requester = userRepository.findByEmail(requesterEmail)
                .orElseThrow(() -> new ApiException("User not found"));
        boolean studentWithClass = requester.getRole().name().equals("STUDENT")
                && requester.getSchoolClass() != null;
        List<Course> courses;
        if (studentWithClass && subsystem != null) {
            courses = courseRepository
                    .findAllByPublishedTrueAndSchoolClassIdAndSchoolClassSubsystemOrderByCreatedAtDesc(
                            requester.getSchoolClass().getId(), subsystem);
        } else if (studentWithClass) {
            courses = courseRepository.findAllByPublishedTrueAndSchoolClassIdOrderByCreatedAtDesc(
                    requester.getSchoolClass().getId());
        } else if (subsystem != null) {
            courses = courseRepository.findAllByPublishedTrueAndSchoolClassSubsystemOrderByCreatedAtDesc(
                    subsystem);
        } else {
            courses = courseRepository.findAllByPublishedTrueOrderByCreatedAtDesc();
        }

        return courses
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public CourseDTO findById(Long id) {
        return toDto(findCourse(id));
    }

    @Transactional
    public CourseDTO saveCourse(
            CreateCourseRequest request,
            MultipartFile file,
            String authorEmail) {
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new ApiException("Author not found"));
        SchoolClass schoolClass = schoolClassRepository.findById(request.classId())
                .orElseThrow(() -> new ApiException("Class not found"));
        Subject subject = subjectRepository.findById(request.subjectId())
                .orElseThrow(() -> new ApiException("Subject not found"));

        if (!subject.getSchoolClass().getId().equals(schoolClass.getId())) {
            throw new ApiException("Subject does not belong to the selected class");
        }

        boolean hasText = request.contentText() != null && !request.contentText().isBlank();
        boolean hasPdf = file != null && !file.isEmpty();
        if (hasText == hasPdf) {
            throw new ApiException("Provide either course text or a PDF file");
        }

        Course course = new Course();
        course.setTitle(request.title().trim());
        course.setDescription(normalize(request.description()));
        course.setSubject(subject);
        course.setSchoolClass(schoolClass);
        course.setAuthor(author);
        course.setPublished(true);

        if (hasText) {
            course.setContentText(request.contentText().trim());
            course.setResourceType(CourseResourceType.TEXT);
        } else {
            validatePdf(file);
            try {
                course.setPdfContent(file.getBytes());
            } catch (IOException exception) {
                throw new ApiException("Unable to read the PDF file");
            }
            course.setPdfFileName(file.getOriginalFilename());
            course.setPdfContentType("application/pdf");
            course.setResourceType(CourseResourceType.PDF);
        }

        return toDto(courseRepository.save(course));
    }

    @Transactional(readOnly = true)
    public Course findCourse(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ApiException("Course not found"));
    }

        @Transactional(readOnly = true)
        public OfflineCourseBundleDTO getOfflineBundle(Long id) {
        Course course = findCourse(id);
        List<OfflineCourseBundleDTO.ResourceDTO> resources = course.getResourceType() == CourseResourceType.PDF
            ? List.of(new OfflineCourseBundleDTO.ResourceDTO(
                course.getPdfFileName(), "PDF", "/api/courses/" + id + "/pdf", null))
            : List.of(new OfflineCourseBundleDTO.ResourceDTO(
                course.getTitle(), "TEXT", null, course.getContentText()));
        List<QuizDTO> quizzes = quizRepository
            .findAllByPublishedTrueAndSchoolClassIdAndSubjectIdOrderByCreatedAtDesc(
                course.getSchoolClass().getId(), course.getSubject().getId())
            .stream()
            .map(this::toQuizDto)
            .toList();
        return new OfflineCourseBundleDTO(toDto(course), List.of(), resources, quizzes);
        }

    @Transactional
    public void delete(Long id, String requesterEmail, boolean admin) {
        Course course = findCourse(id);
        if (!admin && !course.getAuthor().getEmail().equals(requesterEmail)) {
            throw new ApiException("You can only delete your own courses");
        }
        courseRepository.delete(course);
    }

    private CourseDTO toDto(Course course) {
        return new CourseDTO(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getContentText(),
                course.getResourceType(),
                course.getSubject().getId(),
                course.getSubject().getName(),
                course.getSchoolClass().getId(),
                course.getSchoolClass().getName(),
                course.getSchoolClass().getSubsystem(),
                course.getAuthor().getName(),
                course.isPublished(),
                course.getCreatedAt(),
                course.getResourceType() == CourseResourceType.PDF
                        ? "/api/courses/" + course.getId() + "/pdf"
                        : null);
    }

        private QuizDTO toQuizDto(com.smartclass.entity.Quiz quiz) {
        return new QuizDTO(
            quiz.getId(), quiz.getTitle(), quiz.getDescription(), quiz.getDurationSeconds(),
            quiz.getSubject().getId(), quiz.getSubject().getName(), quiz.getSchoolClass().getId(),
            quiz.getSchoolClass().getName(), quiz.getSchoolClass().getSubsystem(), quiz.getAuthor().getName(),
            quiz.isPublished(), quiz.getCreatedAt(),
            quiz.getQuestions().stream()
                .map(question -> new QuizDTO.QuestionDTO(question.getId(), question.getStatement(),
                    question.getPoints(), question.getPosition(), question.getOptions().stream()
                        .map(option -> new QuizDTO.OptionDTO(option.getId(), option.getLabel(),
                            option.getPosition()))
                        .toList()))
                .toList());
        }

    private void validatePdf(MultipartFile file) {
        String contentType = file.getContentType();
        String fileName = file.getOriginalFilename();
        boolean isPdf = "application/pdf".equalsIgnoreCase(contentType)
                || (fileName != null && fileName.toLowerCase().endsWith(".pdf"));
        if (!isPdf) {
            throw new ApiException("Only PDF files are accepted");
        }
    }

    private String normalize(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}