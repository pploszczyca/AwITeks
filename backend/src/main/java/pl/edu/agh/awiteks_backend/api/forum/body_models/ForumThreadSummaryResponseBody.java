package pl.edu.agh.awiteks_backend.api.forum.body_models;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public record ForumThreadSummaryResponseBody(
        @Schema(required = true) Integer id,
        @Schema(required = true) String title,
        @Schema(required = true) String creatorName,
        @Schema(required = true) LocalDateTime creationDate,
        @Schema(required = true) Integer postsCount,
        @Schema(required = true) boolean isFollowed
) {
}


