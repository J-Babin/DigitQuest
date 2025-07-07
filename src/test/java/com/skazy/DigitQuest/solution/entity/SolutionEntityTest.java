package com.skazy.DigitQuest.solution.entity;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DataJpaTest
public class SolutionEntityTest {

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void shouldPersistSolutionWithGeneratedId() {
        // On cree une solution
        SolutionEntity solution = SolutionEntity.builder()
                .positions("168259473")
                .gridJson("{\"values\":[1,6,8,2,5,9,4,7,3]}")
                .isValid(true)
                .calculationTimeMs(250L)
                .build();

        System.out.println("AVANT PERSIST: " + solution); // ← DEBUG

        // On va verifier si les champs id, createdAt et updatedAt sont null car il sont remplis automatiquement
        assertThat(solution.getId()).isNull();
        assertThat(solution.getCreatedAt()).isNull();
        assertThat(solution.getUpdatedAt()).isNull();

        // Sauvegarde en BDD
        SolutionEntity savedSolution = entityManager.persistAndFlush(solution);

        System.out.println("APRÈS PERSIST: " + savedSolution); // ← DEBUG

        // Check de l'auto generation
        assertThat(savedSolution.getId()).isNotNull();
        assertThat(savedSolution.getCreatedAt()).isNotNull();
        assertThat(savedSolution.getUpdatedAt()).isNotNull();

        //Test de la persistance de la donnee en cherchant la solution
        entityManager.clear();
        SolutionEntity foundSolution = entityManager.find(SolutionEntity.class, savedSolution.getId());

        assertThat(foundSolution).isNotNull();
        assertThat(foundSolution.getId()).isEqualTo(savedSolution.getId());
        assertThat(foundSolution.getPositions()).isEqualTo("168259473");

        // Tester la methode getPosition
        assertThat(foundSolution.getPosition(1)).isEqualTo(1);
        assertThat(foundSolution.getPosition(5)).isEqualTo(5);
        assertThat(foundSolution.getPosition(9)).isEqualTo(3);

        // Verifie les autres donne / metadonnee
        assertThat(foundSolution.getIsValid()).isTrue();
        assertThat(foundSolution.getCalculationTimeMs()).isEqualTo(250L);
        assertThat(foundSolution.getGridJson()).isEqualTo("{\"values\":[1,6,8,2,5,9,4,7,3]}");


        System.out.println("Test réussi ! ID généré = " + savedSolution.getId());

    }

    @Test
    void shouldPersistMultipleSolutions() {
        SolutionEntity solution1 = createValidSolution("168259473");
        SolutionEntity solution2 = createValidSolution("937421865");

        SolutionEntity saved1 = entityManager.persistAndFlush(solution1);
        SolutionEntity saved2 = entityManager.persistAndFlush(solution2);

        assertThat(saved1.getId()).isNotNull();
        assertThat(saved2.getId()).isNotNull();
        assertThat(saved1.getId()).isNotEqualTo(saved2.getId());

        assertThat(saved1.getPosition(1)).isEqualTo(1);
        assertThat(saved2.getPosition(1)).isEqualTo(9);

        System.out.println("Deux solutions persistées : " + saved1.getId() + " et " + saved2.getId());
    }

    @Test
    void shouldHandleInvalidSolution() {
        // On cree une solution invalide IsValid = false et temps de calacul a 0
        SolutionEntity invalidSolution = SolutionEntity.builder()
                .positions("123456789")
                .gridJson("{\"values\":[1,2,3,4,5,6,7,8,9]}")
                .isValid(false)        // Override de la valeur par défaut
                .calculationTimeMs(0L)  // Override de la valeur par défaut
                .build();

        SolutionEntity saved = entityManager.persistAndFlush(invalidSolution);

        // check de persistance meme si isValid = false
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getIsValid()).isFalse();
        assertThat(saved.getCalculationTimeMs()).isEqualTo(0L);

        System.out.println("Solution invalide persistée avec ID = " + saved.getId());
    }

    @Test
    void shouldUseDefaultValues() {
        // Test des valeurs par défaut du Builder
        SolutionEntity solution = SolutionEntity.builder()
                .positions("123456789")
                .gridJson("{\"values\":[1,2,3,4,5,6,7,8,9]}")
                .build();

        // Vérification des valeurs par défaut AVANT persistance
        assertThat(solution.getIsValid()).isFalse();
        assertThat(solution.getCalculationTimeMs()).isEqualTo(0L);

        SolutionEntity saved = entityManager.persistAndFlush(solution);

        assertThat(saved.getIsValid()).isFalse();
        assertThat(saved.getCalculationTimeMs()).isEqualTo(0L);

        System.out.println("Valeurs par défaut fonctionnent ! ID = " + saved.getId());
    }

    @Test
    void shouldTestGetPositionMethod() {
        // On test de la méthode getPosition()
        SolutionEntity solution = SolutionEntity.builder()
                .positions("987654321")
                .gridJson("{\"test\": true}")
                .build();

        // Test de chaque position
        assertThat(solution.getPosition(1)).isEqualTo(9);
        assertThat(solution.getPosition(2)).isEqualTo(8);
        assertThat(solution.getPosition(3)).isEqualTo(7);
        assertThat(solution.getPosition(4)).isEqualTo(6);
        assertThat(solution.getPosition(5)).isEqualTo(5);
        assertThat(solution.getPosition(6)).isEqualTo(4);
        assertThat(solution.getPosition(7)).isEqualTo(3);
        assertThat(solution.getPosition(8)).isEqualTo(2);
        assertThat(solution.getPosition(9)).isEqualTo(1);

        System.out.println("Méthode getPosition() fonctionne !");
    }

    @Test
    void shouldTestSetPositionMethod() {
        SolutionEntity solution = SolutionEntity.builder()
                .positions("111111111")  // Toutes les positions à 1
                .gridJson("{\"test\": true}")
                .build();

        // changement de quelque position
        solution.setPosition(1, 9);
        solution.setPosition(5, 5);
        solution.setPosition(9, 3);

        // Verif des changement
        assertThat(solution.getPosition(1)).isEqualTo(9);
        assertThat(solution.getPosition(2)).isEqualTo(1);  // Inchangé
        assertThat(solution.getPosition(5)).isEqualTo(5);
        assertThat(solution.getPosition(9)).isEqualTo(3);

        // Diff de la sequence attendu et de la sequence obtenu
        assertThat(solution.getPositions()).isEqualTo("911151113");

        System.out.println("Méthode setPosition() fonctionne !");
    }

    @Test
    void shouldValidateGetPositionBounds() {
        // Test des validations de getPosition()
        SolutionEntity solution = SolutionEntity.builder()
                .positions("123456789")
                .gridJson("{\"test\": true}")
                .build();

        // Index trop petit
        assertThatThrownBy(() -> solution.getPosition(0))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("L'index doit être entre 1 et 9");

        // Index trop grand
        assertThatThrownBy(() -> solution.getPosition(10))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("L'index doit être entre 1 et 9");

        System.out.println("Validation des bornes de getPosition() fonctionne !");
    }

    @Test
    void shouldValidateSetPositionBounds() {
        // Test des validations de setPosition()
        SolutionEntity solution = SolutionEntity.builder()
                .positions("123456789")
                .gridJson("{\"test\": true}")
                .build();

        // Index invalide
        assertThatThrownBy(() -> solution.setPosition(0, 5))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("L'index doit être entre 1 et 9");

        assertThatThrownBy(() -> solution.setPosition(10, 5))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("L'index doit être entre 1 et 9");

        // Valeur invalide
        assertThatThrownBy(() -> solution.setPosition(1, 0))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("La valeur doit être entre 1 et 9");

        assertThatThrownBy(() -> solution.setPosition(1, 10))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("La valeur doit être entre 1 et 9");

        System.out.println("Validation des bornes de setPosition() fonctionne !");
    }

    private SolutionEntity createValidSolution(String positions) {
        return SolutionEntity.builder()
                .positions(positions)
                .gridJson(String.format("{\"values\":[%s]}",
                        String.join(",", positions.split(""))))  // "123456789" -> "1,2,3,4,5,6,7,8,9"
                .isValid(true)
                .calculationTimeMs(100L)
                .build();
    }
}
