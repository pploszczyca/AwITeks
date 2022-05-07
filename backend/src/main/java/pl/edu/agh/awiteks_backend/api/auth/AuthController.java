package pl.edu.agh.awiteks_backend.api.auth;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.awiteks_backend.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Login user")
    @PostMapping("/login")
    public AuthData login(@RequestBody UserLoginRequestBody loginRequestBody) {
        return authService.authenticateUser(loginRequestBody);
    }

    @Operation(summary = "Register user")
    @PostMapping("/register")
    public AuthData register(@RequestBody UserRegisterRequestBody registerRequestBody) {
        // TODO
        return null;
    }

}