package com.skazy.DigitQuest.solution.service;

import com.skazy.DigitQuest.solution.entity.SolutionEntity;
import com.skazy.DigitQuest.solution.repository.SolutionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SolutionService {

    private SolutionRepository solutionRepository;

    public SolutionEntity displaySolution(Long solutionId) {
       Optional<SolutionEntity> optionalSolutionEntity = solutionRepository.findById(solutionId);
       return optionalSolutionEntity.orElseThrow(() -> new IllegalArgumentException("Le solution n'existe pas"));
    }

    public List<SolutionEntity> findAllSolutions() {
        List<SolutionEntity> allSolutions = solutionRepository.findAll();

        if (allSolutions.isEmpty()) {
            throw new IllegalArgumentException("Aucune solution n'existe dans la base");
        }

        return allSolutions;
    }

}
