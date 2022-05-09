package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.auth.body_models.AuthData;
import pl.edu.agh.awiteks_backend.api.auth.body_models.BadRegisterData;
import pl.edu.agh.awiteks_backend.api.auth.body_models.UserLoginRequestBody;
import pl.edu.agh.awiteks_backend.api.auth.body_models.UserRegisterRequestBody;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.security.jwt.TokenService;

@Service
public class AuthService {
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(TokenService tokenService, UserRepository userRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthData authenticateUser(UserLoginRequestBody userLoginRequest) {
        User user = assertValidCredentials(userLoginRequest.email(), userLoginRequest.password());
        return createTokenFromUser(user);
    }

    private User assertValidCredentials(String email, String password) {
        // password is plaintext here
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return userRepository.findByEmail(email).orElseThrow();
    }

    public ResponseEntity<?> registerUser(UserRegisterRequestBody registerRequestBody) {
        if (isUserAlreadyRegistered(registerRequestBody)) {
            return ResponseEntity
                    .badRequest()
                    .body(new BadRegisterData("User already exist"));
        }

        User newUser = createNewUser(registerRequestBody);
        userRepository.save(newUser);

        return ResponseEntity.ok(createTokenFromUser(newUser));
    }

    private AuthData createTokenFromUser(User user) {
        JwtAccessToken token = tokenService.createAccessToken(user.getId());

        return new AuthData(token.getCredentials(), token.getExpireTime());
    }

    private boolean isUserAlreadyRegistered(UserRegisterRequestBody registerRequestBody) {
        return userRepository.existsByEmail(registerRequestBody.email()) || userRepository.existsByUsername(registerRequestBody.username());
    }

    private User createNewUser(UserRegisterRequestBody registerRequestBody) {
        return new User(
                registerRequestBody.username(),
                registerRequestBody.email(),
                passwordEncoder.encode(registerRequestBody.password()));
    }
}
