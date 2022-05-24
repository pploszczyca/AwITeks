package pl.edu.agh.awiteks_backend.api.forum.body_models;

import io.swagger.v3.oas.annotations.media.Schema;

public record AddPostRequestBody(
        @Schema(required = true) String content
) {
}
