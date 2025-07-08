package com.skazy.DigitQuest.solution.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionResponseDTO {

    private Long id;

    private String positions;

    private String gridJson;

    private Boolean isValid;

    private Long calculationTimeMs;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    // Méthode utilitaire pour récupérer une position
    public Integer getPosition(int index) {
        if (index < 1 || index > 9) {
            throw new IllegalArgumentException("L'index doit être entre 1 et 9");
        }
        return Character.getNumericValue(positions.charAt(index - 1));
    }
}