package com.smartclass.repository;

import com.smartclass.entity.QuizAttempt;
import com.smartclass.entity.QuizAttemptStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    Optional<QuizAttempt> findByQuizIdAndStudentIdAndStatus(
            Long quizId,
            Long studentId,
            QuizAttemptStatus status);

    Optional<QuizAttempt> findByIdAndStudentId(Long id, Long studentId);

        Optional<QuizAttempt> findByClientUuid(String clientUuid);

        boolean existsByClientUuid(String clientUuid);

    List<QuizAttempt> findAllByStudentIdAndStatusInOrderBySubmittedAtDesc(
            Long studentId,
            List<QuizAttemptStatus> statuses);
}