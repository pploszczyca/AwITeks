package pl.edu.agh.awiteks_backend.api.auth.body_models;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record AuthResponse(
        @Schema(required = false) AuthData authData,
        @Schema(required = false) List<String> errors
) {
    public static AuthResponse withOkStatus(AuthData data) {
        return new AuthResponse(data, null);
    }

    public static AuthResponse withErrors(List<String> errors) {
        return new AuthResponse(null, errors);
    }
}
