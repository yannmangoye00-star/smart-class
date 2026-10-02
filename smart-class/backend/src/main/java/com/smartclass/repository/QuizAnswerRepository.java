package com.smartclass.repository;

import com.smartclass.entity.QuizAnswer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAnswerRepository extends JpaRepository<QuizAnswer, Long> {

    List<QuizAnswer> findAllByAttemptId(Long attemptId);
}