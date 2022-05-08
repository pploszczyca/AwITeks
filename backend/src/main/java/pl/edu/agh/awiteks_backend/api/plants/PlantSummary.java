package pl.edu.agh.awiteks_backend.api.plants;

import io.swagger.v3.oas.annotations.media.Schema;

public record PlantSummary(
        @Schema(required = true) Integer id,
        @Schema(required = true) String name,
        @Schema(required = true) String speciesName,
        @Schema(required = true) Boolean isFavourite,
        @Schema(required = true) String imgUrl
) {
}
