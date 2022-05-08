package pl.edu.agh.awiteks_backend.api.species.body_models;

import io.swagger.v3.oas.annotations.media.Schema;
import pl.edu.agh.awiteks_backend.models.Fertilization;
import pl.edu.agh.awiteks_backend.models.Insolation;

public record AddSpeciesRequestBody(
        @Schema(required = true) String name,
        @Schema(required = true) Fertilization fertilizationDose,
        @Schema(required = true) int fertilizationRoutine,
        @Schema(required = true) int maxAge,
        @Schema(required = true) Insolation neededInsolation,
        @Schema(required = true) int waterDose,
        @Schema(required = true) int waterRoutine
) {
}
