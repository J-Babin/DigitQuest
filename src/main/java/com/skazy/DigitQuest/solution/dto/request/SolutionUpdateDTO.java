package com.skazy.DigitQuest.solution.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolutionUpdateDTO {
    @Pattern(regexp = "^[1-9]{9}$", message = "Doit contenir exactement 9 chiffres de 1 à 9")
    private String positions;

    private String gridJson;

    private Boolean isValid;

    @Min(value = 0, message = "Le temps de calcul ne peut pas être négatif")
    private Long calculationTimeMs;
}
