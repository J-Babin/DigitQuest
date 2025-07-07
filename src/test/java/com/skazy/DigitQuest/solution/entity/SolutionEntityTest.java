package com.skazy.DigitQuest.solution.entity;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class SolutionEntityTest {

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void shouldPersistSolutionWithGeneratedId() {
        // On cree une solution
        SolutionEntity solution = new SolutionEntity();
        solution.setPos1(1);
        solution.setPos2(6);
        solution.setPos3(8);
        solution.setPos4(2);
        solution.setPos5(5);
        solution.setPos6(9);
        solution.setPos7(4);
        solution.setPos8(7);
        solution.setPos9(3);
        solution.setIsValid(true);
        solution.setCalculationTimeMs(250L);
        solution.setGridJson("{\"values\":[1,6,8,2,5,9,4,7,3]}");

        System.out.println("AVANT PERSIST: " + solution); // ← DEBUG

        // On va verifier si les champs id, createdAt et updatedAt sont null car il sont remplis automatiquement
        assertThat(solution.getId()).isNull();
        assertThat(solution.getCreatedAt()).isNull();
        assertThat(solution.getUpdateAt()).isNull();

        // Sauvegarde en BDD
        SolutionEntity savedSolution = entityManager.persistAndFlush(solution);

        System.out.println("APRÈS PERSIST: " + savedSolution); // ← DEBUG

        // Check de l'auto generation
        assertThat(savedSolution.getId()).isNotNull();
        assertThat(savedSolution.getCreatedAt()).isNotNull();
        assertThat(savedSolution.getUpdateAt()).isNotNull();

        //Test de la persistance de la donnee en cherchant la solution
        entityManager.clear();
        SolutionEntity foundSolution = entityManager.find(SolutionEntity.class, savedSolution.getId());

        assertThat(foundSolution).isNotNull();
        assertThat(foundSolution.getId()).isEqualTo(savedSolution.getId());
        assertThat(foundSolution.getPos1()).isEqualTo(1);
        assertThat(foundSolution.getPos5()).isEqualTo(5);
        assertThat(foundSolution.getPos9()).isEqualTo(3);

        // Verifie les autres donne / metadonnee
        assertThat(foundSolution.getIsValid()).isTrue();
        assertThat(foundSolution.getCalculationTimeMs()).isEqualTo(250L);
        assertThat(foundSolution.getGridJson()).isEqualTo("{\"values\":[1,6,8,2,5,9,4,7,3]}");

        System.out.println("✅ Test réussi ! ID généré = " + savedSolution.getId());

    }

    @Test
    void shouldPersistMultipleSolutions() {
        SolutionEntity solution1 = createValidSolution(1, 6, 8, 2, 5, 9, 4, 7, 3);
        SolutionEntity solution2 = createValidSolution(9, 3, 7, 4, 2, 1, 8, 6, 5);

        SolutionEntity saved1 = entityManager.persistAndFlush(solution1);
        SolutionEntity saved2 = entityManager.persistAndFlush(solution2);

        assertThat(saved1.getId()).isNotNull();
        assertThat(saved2.getId()).isNotNull();
        assertThat(saved1.getId()).isNotEqualTo(saved2.getId());

        assertThat(saved1.getPos1()).isEqualTo(1);
        assertThat(saved2.getPos1()).isEqualTo(9);

        System.out.println("✅ Deux solutions persistées : " + saved1.getId() + " et " + saved2.getId());
    }

    @Test
    void shouldHandleInvalidSolution() {
        // On cree une solution invalide IsValid = false et temps de calacul a 0
        SolutionEntity invalidSolution = createValidSolution(1, 2, 3, 4, 5, 6, 7, 8, 9);
        invalidSolution.setIsValid(false);
        invalidSolution.setCalculationTimeMs(0L);

        SolutionEntity saved = entityManager.persistAndFlush(invalidSolution);

        // check de persistance meme si isValid = false
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getIsValid()).isFalse();
        assertThat(saved.getCalculationTimeMs()).isEqualTo(0L);

        System.out.println("✅ Solution invalide persistée avec ID = " + saved.getId());
    }

    private SolutionEntity createValidSolution(int pos1, int pos2, int pos3, int pos4, int pos5,
                                               int pos6, int pos7, int pos8, int pos9) {
        SolutionEntity solution = new SolutionEntity();
        solution.setPos1(pos1);
        solution.setPos2(pos2);
        solution.setPos3(pos3);
        solution.setPos4(pos4);
        solution.setPos5(pos5);
        solution.setPos6(pos6);
        solution.setPos7(pos7);
        solution.setPos8(pos8);
        solution.setPos9(pos9);
        solution.setIsValid(true);
        solution.setCalculationTimeMs(100L);
        solution.setGridJson(String.format("{\"values\":[%d,%d,%d,%d,%d,%d,%d,%d,%d]}",
                pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9));
        return solution;
    }
}
