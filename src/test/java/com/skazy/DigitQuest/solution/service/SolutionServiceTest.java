package com.skazy.DigitQuest.solution.service;

import com.skazy.DigitQuest.solution.entity.SolutionEntity;
import com.skazy.DigitQuest.solution.repository.SolutionRepository;
import org.junit.jupiter.api.BeforeEach;
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
    private SolutionService SolutionService;

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
        SolutionEntity solution = SolutionService.finById(solution1Id);
        assertThat(solution).isNotNull();
        assertThat(solution.getId()).isEqualTo(solution1Id);
        assertThat(solution.getGridJson()).isEqualTo("{\"type\":\"test1\"}");
    }

    @Test
    void shouldThrowExceptionForInvalidId() {
        // Tester avec un id qui n'existe pas
        Long badSolutionId = 9999999L;
        assertThatThrownBy(() -> SolutionService.finById(badSolutionId))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Le solution n'existe pas");
    }

    @Test
    void ShouldDisplayAllSolutions() {
        List<SolutionEntity> allSolutions = SolutionService.findAllSolutions();
        assertThat(allSolutions).isNotNull();
        assertThat(allSolutions).hasSize(4);

        for (SolutionEntity solution : allSolutions) {
            System.out.println(solution);
        }
    }
}
