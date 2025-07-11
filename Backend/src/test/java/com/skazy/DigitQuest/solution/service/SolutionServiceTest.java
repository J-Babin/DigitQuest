package com.skazy.DigitQuest.solution.service;

import com.skazy.DigitQuest.solution.dto.request.SolutionUpdateDTO;
import com.skazy.DigitQuest.solution.entity.SolutionEntity;
import com.skazy.DigitQuest.solution.repository.SolutionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
public class SolutionServiceTest {
    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private SolutionService solutionService;

    private Long solution1Id;


    @BeforeEach
    void setUp() {
        solutionRepository.deleteAll();


        // Une solution qui commençant par 1, valide
        SolutionEntity solution1 = SolutionEntity.builder()
                .positions("123456789")
                .gridJson("{\"type\":\"test1\"}")
                .isValid(true)
                .calculationTimeMs(100L)
                .build();

        //Une solution qui commençant par 9, valide
        SolutionEntity solution2 = SolutionEntity.builder()
                .positions("987654321")
                .gridJson("{\"type\":\"test2\"}")
                .isValid(true)
                .calculationTimeMs(5000L)
                .build();

        // Une solution qui commençant par 5, invalide
        SolutionEntity solution3 = SolutionEntity.builder()
                .positions("555555555")
                .gridJson("{\"type\":\"test3\"}")
                .isValid(false)
                .calculationTimeMs(50L)
                .build();

        // Une solution qui commençant par 1, valide
        SolutionEntity solution4 = SolutionEntity.builder()
                .positions("192837465")
                .gridJson("{\"type\":\"test4\"}")
                .isValid(true)
                .calculationTimeMs(750L)
                .build();

        solutionRepository.save(solution1);
        solutionRepository.save(solution2);
        solutionRepository.save(solution3);
        solutionRepository.save(solution4);

        solution1Id = solution1.getId();

        long count = solutionRepository.count();
        System.out.println("✅ Setup terminé: " + count + " solutions en base");

        if (count != 4) {
            throw new RuntimeException("ERREUR: Devrait avoir 4 solutions, mais il y en a " + count);
        }
    }

    @Test
    void getOneSolution() {
        SolutionEntity solution = solutionService.findById(solution1Id);
        assertThat(solution).isNotNull();
        assertThat(solution.getId()).isEqualTo(solution1Id);
        assertThat(solution.getGridJson()).isEqualTo("{\"type\":\"test1\"}");
    }

    @Test
    void shouldThrowExceptionForInvalidId() {
        // Tester avec un id qui n'existe pas
        Long badSolutionId = 9999999L;
        assertThatThrownBy(() -> solutionService.findById(badSolutionId))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Le solution n'existe pas");
    }
    @Test
    void ShouldDisplayAllSolutions() {
        List<SolutionEntity> allSolutions = solutionService.findAllSolutions();
        assertThat(allSolutions).isNotNull();
        assertThat(allSolutions).hasSize(4);

        for (SolutionEntity solution : allSolutions) {
            System.out.println(solution);
        }
    }

    @Test
    @DisplayName("Le Test doit cree une nouvelle solution")
    void shouldCreateSolution(){
        SolutionEntity newSolution = SolutionEntity.builder()
                .positions("234567891")
                .gridJson("{\"type\":\"testNewSolution\"}")
                .isValid(true)
                .calculationTimeMs(100L)
                .build();

        SolutionEntity result = solutionService.createSolution(newSolution);

        assertThat(result).isNotNull();
        assertThat(result.getPositions()).isEqualTo(newSolution.getPositions());
    }

    @Test
    @DisplayName("Doit update une solution")
    void shouldUpdateSolution(){
        SolutionUpdateDTO updateDTO = SolutionUpdateDTO.builder()
                .isValid(false)
                .build();

        SolutionEntity solutionExisting = solutionService.findById(solution1Id);

        System.out.println("Before modification : " + solutionExisting);

        SolutionEntity result = solutionService.updateSolution(solution1Id, updateDTO);

        assertThat(result.getIsValid()).isFalse();

        System.out.println("After modification : " + result);

    }

    @Test
    @DisplayName("Doit trouver une solution par sont ID")
    void shouldFindSolutionById(){
        SolutionEntity solution = solutionService.findById(solution1Id);

        assertThat(solution).isNotNull();
        assertThat(solution.getId()).isEqualTo(solution1Id);
        assertThat(solution.getGridJson()).isEqualTo("{\"type\":\"test1\"}");
    }

    @Test
    @DisplayName("Doit delete la premiere solution")
    void shouldDeleteSolution(){
        SolutionEntity solution = solutionService.findById(solution1Id);

        assertThat(solution).isNotNull();

        solutionService.deleteSolution(solution1Id);

        assertThat(solutionRepository.findById(solution1Id).isPresent()).isFalse();

    }
}
