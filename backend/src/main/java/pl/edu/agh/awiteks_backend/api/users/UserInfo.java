package pl.edu.agh.awiteks_backend.api.users;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserInfo(
        @Schema(required = true) String email,
        @Schema(required = true) String username
        ) {
}
