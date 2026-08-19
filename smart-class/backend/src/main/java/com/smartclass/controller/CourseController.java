
@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173") // URL de Vite
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        return ResponseEntity.ok(courseService.findAll());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CourseDTO> createCourse(
            @RequestParam("title") String title,
            @RequestParam("classLevel") String classLevel,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        CourseDTO created = courseService.saveCourse(title, classLevel, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
