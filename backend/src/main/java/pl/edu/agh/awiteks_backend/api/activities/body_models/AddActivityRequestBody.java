package pl.edu.agh.awiteks_backend.api.activities.body_models;

import io.swagger.v3.oas.annotations.media.Schema;
import pl.edu.agh.awiteks_backend.models.ActivityType;

public record AddActivityRequestBody(
        @Schema(required = true) int plantId,
        @Schema(required = true) ActivityType activityType,
        @Schema(required = true) String date
) {
}
