package pl.edu.agh.awiteks_backend.api.plants.body_models;

import io.swagger.v3.oas.annotations.media.Schema;
import pl.edu.agh.awiteks_backend.models.Insolation;

public record AddPlantRequestBody(
        @Schema(required = true) String name,
        @Schema(required = true) Insolation insolation,
        @Schema(required = true) String lastWateringDate,
        @Schema(required = true) String lastFertilizationDate,
        @Schema(required = true) String note,
        @Schema(required = true) int speciesId,
        @Schema String photo
) {

}
