package com.skazy.DigitQuest.solution.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionCreateDTO {
    @NotBlank(message = "Les positions sont obligatoires")
    @Pattern(regexp = "^[1-9]{9}$", message = "Doit contenir exactement 9 chiffres de 1 à 9")
    private String positions;

    @NotBlank(message = "Le JSON de la grille est obligatoire")
    private String gridJson;

    @Builder.Default
    private Boolean isValid = false;

    @Min(value = 0, message = "Le temps de calcul ne peut pas être négatif")
    @Builder.Default
    private Long calculationTimeMs = 0L;
}
