package pl.edu.agh.awiteks_backend.api.plants;

import io.swagger.v3.oas.annotations.media.Schema;

public record PlantsStats(
        @Schema(required = true) int totalPlants,
        @Schema(required = true) int neglectedPlants,
        @Schema(required = true) int wellGroomedPlants
        ) {
}
