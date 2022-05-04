package pl.edu.agh.awiteks_backend.api.plants;

import io.swagger.v3.oas.annotations.media.Schema;
import pl.edu.agh.awiteks_backend.models.Insolation;

public record AddPlantRequestBody(
        @Schema(required = true) String name,
        @Schema(required = true) Insolation insolation,
        @Schema(required = true) String lastWateringDate,
        @Schema(required = true) String lastFertilizationDate,// TODO maybe use Date or smth like this here once DB is working??
        @Schema(required = true) String note,
        @Schema(required = true) int speciesId
) {

}
