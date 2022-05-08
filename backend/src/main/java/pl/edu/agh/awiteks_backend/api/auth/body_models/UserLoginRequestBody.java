package pl.edu.agh.awiteks_backend.api.auth.body_models;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserLoginRequestBody(
        @Schema(required = true) String email,
        @Schema(required = true) String password
) {
}
