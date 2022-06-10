package pl.edu.agh.awiteks_backend.api.users.body_models;

import io.swagger.v3.oas.annotations.media.Schema;
import org.apache.commons.lang3.tuple.Pair;
import pl.edu.agh.awiteks_backend.models.ActivityType;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import java.util.List;

public record UserMainSummary(
        @Schema(required = true)
        List<Pair<String, List<ActivityType>>> missedActivities,
        @Schema(required = true)
        List<Pair<String, List<ActivityType>>> incomingActivities,
        @Schema(required = true)
        List<Pair<String, ForumPost>> forumThreads) {
}


