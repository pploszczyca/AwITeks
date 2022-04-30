package pl.edu.agh.awiteks_backend.api.forum;

import io.swagger.v3.oas.annotations.media.Schema;

public record AddThreadRequestBody(
        @Schema(required = true) String name,
        @Schema(required = true) String content
) {
}
