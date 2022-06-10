package pl.edu.agh.awiteks_backend.api.users.body_models;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserForumThreadsSummary(
        @Schema(required = true) Integer forumThreadId,
        @Schema(required = true) String title,
        @Schema(required = true) String content,
        @Schema(required = true) String date
) {
}
