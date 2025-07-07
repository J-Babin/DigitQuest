package com.skazy.DigitQuest.solution.repository;

import com.skazy.DigitQuest.solution.entity.SolutionEntity;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.Optional;
import java.util.List;

@DataJpaTest
public class SolutionRepositoryTest {
    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private TestEntityManager entityManager;

    private Long solution1Id;

    @BeforeEach
    void setUp() {
        solutionRepository.deleteAll();
        entityManager.flush();
        entityManager.clear();


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

        entityManager.persistAndFlush(solution1);
        entityManager.persistAndFlush(solution2);
        entityManager.persistAndFlush(solution3);
        entityManager.persistAndFlush(solution4);

        solution1Id = solution1.getId();

        entityManager.clear();

        long count = solutionRepository.count();
        System.out.println("✅ Setup terminé: " + count + " solutions en base");

        if (count != 4) {
            throw new RuntimeException("ERREUR: Devrait avoir 4 solutions, mais il y en a " + count);
        }
    }

    @Test
    void shouldFindBySpecificPosValue() {
        // Recherche solutions avec 1 en première position
        List<SolutionEntity> pos1Equals1 = solutionRepository.findBySpecificPosValue(1,1);

        assertThat(pos1Equals1).hasSize(2); // solution1 et solution4
        assertThat(pos1Equals1).extracting("positions")
                .containsExactlyInAnyOrder("123456789", "192837465");

        // Recherche solutions avec 5 en position centrale (5)
        List<SolutionEntity> pos5Equals5 = solutionRepository.findBySpecificPosValue(5, 5);

        assertThat(pos5Equals5).hasSize(3); // toutes sauf solution4
        assertThat(pos5Equals5).extracting("positions")
                .containsExactlyInAnyOrder("123456789", "555555555", "987654321");

        // Recherche solutions avec 9 en dernière position
        List<SolutionEntity> pos9Equals9 = solutionRepository.findBySpecificPosValue(9, 9);

        assertThat(pos9Equals9).hasSize(1); // solution1 seulement
        assertThat(pos9Equals9.get(0).getPositions()).isEqualTo("123456789");

        System.out.println("✅ Tests findBySpecificPosValue réussis!");
    }

    @Test
    void shouldFindById(){
        // On test la recherche d'une solution par son ID ici 1
        Optional<SolutionEntity> optionalSolution = solutionRepository.findById(solution1Id);
        
        assertThat(optionalSolution).isPresent();
        SolutionEntity solution = optionalSolution.get();

        System.out.println(solution);
        System.out.println("✅ Tests findById réussis!");
    }

    @AfterEach
    void tearDown() {
        solutionRepository.deleteAll();
        entityManager.clear();
    }
}
