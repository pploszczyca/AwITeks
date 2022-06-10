package pl.edu.agh.awiteks_backend.api.users.body_models;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record UserMainSummary(
        @Schema(required = true) List<UserPlantSummary> missedActivities,
        @Schema(required = true) List<UserPlantSummary> incomingActivities,
        @Schema(required = true) List<UserForumThreadsSummary> forumThreads
) {
}
