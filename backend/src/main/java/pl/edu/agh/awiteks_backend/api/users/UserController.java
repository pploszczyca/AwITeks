package pl.edu.agh.awiteks_backend.api.users;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.awiteks_backend.api.users.body_models.UserInfo;
import static pl.edu.agh.awiteks_backend.configs.SwaggerConfig.JWT_AUTH;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.services.UserService;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Operation(summary = "Get my data", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping("/me")
    public UserInfo getMe(JwtAccessToken jwtAccessToken) {
        // we could keep that data in JWT, but in that case we would send it
        // in every request, it should be more efficient (and flexible) to leave an endpoint so that
        // browser can get and cache this info on reload, we don't need entire User data tho
        return userService.getUserInfo(jwtAccessToken.getUserId());
    }

    @Operation(summary = "Get user plants calendar", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping("/calendar")
    public ResponseEntity getUserPlantsCalendar(JwtAccessToken jwtAccessToken) {
        return userService.getUserPlantsCalendar(jwtAccessToken.getUserId());
    }

}
