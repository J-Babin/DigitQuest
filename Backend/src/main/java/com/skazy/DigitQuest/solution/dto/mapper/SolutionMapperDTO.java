package com.skazy.DigitQuest.solution.dto.mapper;

import com.skazy.DigitQuest.solution.dto.request.SolutionCreateDTO;
import com.skazy.DigitQuest.solution.dto.request.SolutionUpdateDTO;
import com.skazy.DigitQuest.solution.dto.response.SolutionResponseDTO;
import com.skazy.DigitQuest.solution.dto.response.SolutionSummaryDTO;
import com.skazy.DigitQuest.solution.entity.SolutionEntity;
import org.springframework.stereotype.Component;

@Component
public class SolutionMapperDTO {

    public SolutionResponseDTO toResponseDTO(SolutionEntity entity) {
        return SolutionResponseDTO.builder()
                .id(entity.getId())
                .positions(entity.getPositions())
                .gridJson(entity.getGridJson())
                .isValid(entity.getIsValid())
                .calculationTimeMs(entity.getCalculationTimeMs())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public SolutionEntity toEntity(SolutionCreateDTO dto) {
        return SolutionEntity.builder()
                .positions(dto.getPositions())
                .gridJson(dto.getGridJson())
                .isValid(dto.getIsValid())
                .calculationTimeMs(dto.getCalculationTimeMs())
                .build();
    }

    public void updateEntityFromDTO(SolutionEntity entity, SolutionUpdateDTO dto) {
        if (dto.getPositions() != null) {
            entity.setPositions(dto.getPositions());
        }
        if (dto.getGridJson() != null) {
            entity.setGridJson(dto.getGridJson());
        }
        if (dto.getIsValid() != null) {
            entity.setIsValid(dto.getIsValid());
        }
        if (dto.getCalculationTimeMs() != null) {
            entity.setCalculationTimeMs(dto.getCalculationTimeMs());
        }
    }

    public SolutionSummaryDTO toSummaryDTO(SolutionEntity entity) {
        return SolutionSummaryDTO.builder()
                .id(entity.getId())
                .positions(entity.getPositions())
                .isValid(entity.getIsValid())
                .calculationTimeMs(entity.getCalculationTimeMs())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
