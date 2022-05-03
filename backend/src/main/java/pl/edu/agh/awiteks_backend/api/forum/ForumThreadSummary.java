package pl.edu.agh.awiteks_backend.api.forum;

import io.swagger.v3.oas.annotations.media.Schema;
import pl.edu.agh.awiteks_backend.models.User;

import java.time.LocalDateTime;
import java.util.Date;

public record ForumThreadSummary(
        @Schema(required = true) Integer id,
        @Schema(required = true) String title,
        @Schema(required = true) User creator,
        @Schema(required = true) LocalDateTime creationDate,
        @Schema(required = true) Integer postsCount,
        @Schema(required = true) boolean isFollowed
) {
}


