package com.skazy.DigitQuest.solution.service;

import com.skazy.DigitQuest.solution.dto.mapper.SolutionMapperDTO;
import com.skazy.DigitQuest.solution.dto.request.SolutionUpdateDTO;
import com.skazy.DigitQuest.solution.entity.SolutionEntity;
import com.skazy.DigitQuest.solution.repository.SolutionRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SolutionService {

    private SolutionRepository solutionRepository;
    private final SolutionMapperDTO solutionMapper;

    public SolutionEntity findById(Long solutionId) {
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

    public SolutionEntity createSolution(SolutionEntity solutionEntity) {
        if (solutionEntity == null) {
            throw new IllegalArgumentException("Le solution ne peux pas etre null");
        }

        return solutionRepository.save(solutionEntity);
    }
    @Transactional
    public void deleteSolution(Long solutionId) {
        Optional<SolutionEntity> optionalSolutionEntity = solutionRepository.findById(solutionId);

        if (optionalSolutionEntity.isEmpty()) {
            throw new IllegalArgumentException("La solution avec l'ID " + solutionId + " n'existe pas");
        }

        solutionRepository.deleteById(solutionId);

        if (solutionRepository.existsById(solutionId)) {
            throw new RuntimeException("Erreur lors de la suppression - la solution existe encore");
        }
    }

    @Transactional
    public SolutionEntity updateSolution(Long solutionId, SolutionUpdateDTO updatedSolution) {
        SolutionEntity existingSolution = solutionRepository.findById(solutionId)
                .orElseThrow(() -> new IllegalArgumentException("Solution non trouvée avec l'ID: " + solutionId));

        solutionMapper.updateEntityFromDTO(existingSolution, updatedSolution);

        //TODO: Faire une validation de modification si updatedSolution === celle qui se trouve en bdd
        return solutionRepository.save(existingSolution);
    }

    @Transactional
    public void saveMultipleSolutions(List<SolutionEntity> solutions) {
        try {
            solutionRepository.saveAll(solutions);
        }
        catch (Exception ignored) {

        }
    }


}
