package pl.edu.agh.awiteks_backend.api.users.body_models;

import io.swagger.v3.oas.annotations.media.Schema;
import pl.edu.agh.awiteks_backend.models.ActivityType;
import java.util.List;

public record UserPlantSummary(
        @Schema(required = true) String plantName,
        @Schema(required = true) List<ActivityType> activityTypes) {
}


