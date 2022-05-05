package pl.edu.agh.awiteks_backend.api.auth;

import io.swagger.v3.oas.annotations.media.Schema;


public record AuthData(
        @Schema(required = true) String accessToken,
        @Schema(required = true) long expiresIn
) {
}
