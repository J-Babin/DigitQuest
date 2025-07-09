package com.skazy.DigitQuest.solution.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "SOLUTION")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 9)
    @Pattern(regexp = "^[1-9]{9}$", message = "Doit contenir exactement 9 chiffres de 1 à 9")
    private String positions;

    @Column(columnDefinition = "TEXT", nullable = false, unique = true)
    @NotNull(message = "Le JSON de la grille est obligatoire")
    private String gridJson;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isValid = false;

    @Column(nullable = false)
    @Builder.Default
    private Long calculationTimeMs = 0L;

    @Column
    private Integer totalSolutions = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Integer getPosition(int index) {
        if (index < 1 || index > 9) {
            throw new IllegalArgumentException("L'index doit être entre 1 et 9");
        }
        return Character.getNumericValue(positions.charAt(index - 1));
    }

    public void setPosition(int index, int value) {
        if (index < 1 || index > 9) {
            throw new IllegalArgumentException("L'index doit être entre 1 et 9");
        }
        if (value < 1 || value > 9) {
            throw new IllegalArgumentException("La valeur doit être entre 1 et 9");
        }
        StringBuilder sb = new StringBuilder(positions);
        sb.setCharAt(index - 1, Character.forDigit(value, 10));
        positions = sb.toString();
    }
}