package pl.edu.agh.awiteks_backend.api.auth.body_models;

import io.swagger.v3.oas.annotations.media.Schema;

public record BadRegisterData(
        @Schema(required = true) String message
) {
}
