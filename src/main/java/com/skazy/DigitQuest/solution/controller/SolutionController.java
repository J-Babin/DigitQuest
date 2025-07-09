package com.skazy.DigitQuest.solution.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.skazy.DigitQuest.puzzle.algorithm.BacktrackingSolver;
import com.skazy.DigitQuest.solution.dto.mapper.SolutionMapperDTO;
import com.skazy.DigitQuest.solution.dto.request.SolutionCreateDTO;
import com.skazy.DigitQuest.solution.dto.request.SolutionUpdateDTO;
import com.skazy.DigitQuest.solution.dto.response.SolutionResponseDTO;
import com.skazy.DigitQuest.solution.dto.response.SolutionSummaryDTO;
import com.skazy.DigitQuest.solution.entity.SolutionEntity;
import com.skazy.DigitQuest.solution.service.SolutionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/solutions")
@Tag(name = "Solutions", description = "Gestion des solutions du puzzle vietnamien")
@RequiredArgsConstructor
@Validated
public class SolutionController {

    private final SolutionService solutionService;
    private final SolutionMapperDTO solutionMapperDTO;

    @GetMapping("test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Health check");
    }

    @GetMapping("/")
    @Operation(summary = "Récupérer toutes les solutions",
            description = "Retourne la liste complète des solutions enregistrées")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Liste des solutions récupérée avec succès"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur")
    })
    public ResponseEntity<List<SolutionSummaryDTO>> getAllSolutions() {
            List<SolutionEntity> allSolutions = solutionService.findAllSolutions();
            List<SolutionSummaryDTO> summaries = allSolutions.stream()
                    .map(solutionMapperDTO::toSummaryDTO)
                    .toList();
            return ResponseEntity.ok(summaries);
    }

    @GetMapping("/solution/{id}")
    @Operation(summary = "Récupère une solution",
            description = "Retourne la solution par son id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Liste des solutions récupérée avec succès"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur")
    })
    public ResponseEntity<SolutionResponseDTO> getSolution(@PathVariable Long id) {
        SolutionEntity solution = solutionService.findById(id);
        SolutionResponseDTO solutionResponseDTO = solutionMapperDTO.toResponseDTO(solution);
        return ResponseEntity.ok(solutionResponseDTO);
    }


    @PostMapping("solution")
    @Operation(summary = "Creer une nouvelle solution",
            description = "Retourne la solution nouvellement cree")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201" , description = "Creation de la nouvelle solution effectuee"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur")
    })
    public ResponseEntity<SolutionResponseDTO> createSolution(@Valid @RequestBody SolutionCreateDTO solutionCreateDTO) {
        SolutionEntity solutionEntity = solutionMapperDTO.toEntity(solutionCreateDTO);
        SolutionEntity result = solutionService.createSolution(solutionEntity);

        if (result != null) {
            return ResponseEntity.ok(solutionMapperDTO.toResponseDTO(result));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PatchMapping("solution/update/{id}")
    @Operation(summary = "Mise a jour d'une solution",
            description = "Retourne la solution modifier")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200" , description = "Solution mise a jour"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur")
    })
    public  ResponseEntity<SolutionResponseDTO> updateSolution(@Valid @RequestBody SolutionUpdateDTO solutionUpdateDTO, @PathVariable Long id) {
        SolutionEntity solutionEntity = solutionService.updateSolution(id, solutionUpdateDTO);
        SolutionResponseDTO solutionResponseDTO = solutionMapperDTO.toResponseDTO(solutionEntity);
        if (solutionResponseDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(solutionResponseDTO);
    }

    @DeleteMapping("solution/{id}")
    @Operation(summary = "Suppression d'une solution",
            description = "Retourne status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200" , description = "Solution delete"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur")
    })
    public ResponseEntity<HttpStatus> deleteSolution(@PathVariable Long id) {
        solutionService.deleteSolution(id);
        try {
            solutionService.findById(id);
            return ResponseEntity.internalServerError().build();
        }catch (IllegalArgumentException e){
            return ResponseEntity.ok().build();
        }
    }


    @PostMapping("/generate")
    @Operation(summary = "Generation de toutes les solutions possibles",
            description = "Retourne toutes les solution trouvees")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200" , description = "Solution Genere"),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur")
    })
    public List<SolutionEntity> generateAndSaveSolutions(@RequestBody JsonNode jsonNode) {
        boolean solverStrict = jsonNode.get(("solverStrict")).asBoolean();
        BacktrackingSolver solver = new BacktrackingSolver(solverStrict);
        List<SolutionEntity> allSolutions = solver.startSolve();
        try {
            solutionService.saveMultipleSolutions(allSolutions);
        }
        catch (Exception e) {
            return allSolutions;
        }

        return allSolutions;
    }
}
