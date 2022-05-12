package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.auth.body_models.*;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.security.jwt.TokenService;
import pl.edu.agh.awiteks_backend.utilities.UserDataValidationUtilities;

import java.util.LinkedList;
import java.util.List;

@Service
public class AuthService {
    private final static String USER_EXISTS_ERROR_MESSAGE = "user already exists";
    private final static String REGISTER_DATA_ERROR_MESSAGE = "Registration data is not correct";
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserDataValidationUtilities userDataValidationUtilities;

    @Autowired
    public AuthService(TokenService tokenService, UserRepository userRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserDataValidationUtilities userDataValidationUtilities) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userDataValidationUtilities = userDataValidationUtilities;
    }

    public AuthResponse authenticateUser(UserLoginRequestBody userLoginRequest) {
        try {
            User user = assertValidCredentials(userLoginRequest.email(), userLoginRequest.password());
            return AuthResponse.withOkStatus(createTokenFromUser(user));
        } catch (Exception exception) {
            // maybe make it more sophisticated (especially if exception may have no user-friendly msg)
            return AuthResponse.withErrors(List.of(exception.getMessage()));
        }
    }

    private User assertValidCredentials(String email, String password) {
        // password is plaintext here
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return userRepository.findByEmail(email).orElseThrow();
    }

    public AuthResponse registerUser(UserRegisterRequestBody registerRequestBody) {
        if(!isRegisterDataProper(registerRequestBody)) {
            return makeErrorResponse(REGISTER_DATA_ERROR_MESSAGE);
        }

        if (isUserAlreadyRegistered(registerRequestBody)) {
            return makeErrorResponse(USER_EXISTS_ERROR_MESSAGE);
        }

        User newUser = createNewUser(registerRequestBody);
        userRepository.save(newUser);

        return AuthResponse.withOkStatus(createTokenFromUser(newUser));
    }

    private AuthData createTokenFromUser(User user) {
        JwtAccessToken token = tokenService.createAccessToken(user.getId());

        return new AuthData(token.getCredentials(), token.getExpireTime());
    }

    private boolean isUserAlreadyRegistered(UserRegisterRequestBody registerRequestBody) {
        return userRepository.existsByEmail(registerRequestBody.email()) || userRepository.existsByUsername(registerRequestBody.username());
    }

    private boolean isRegisterDataProper(UserRegisterRequestBody registerRequestBody) {
        return userDataValidationUtilities.validateEmail(registerRequestBody.email()) &&
                userDataValidationUtilities.validateUsername(registerRequestBody.username()) &&
                userDataValidationUtilities.validatePassword(registerRequestBody.password());
    }

    private AuthResponse makeErrorResponse(String errorMessage) {
        return AuthResponse.withErrors(List.of(errorMessage));
    }

    private User createNewUser(UserRegisterRequestBody registerRequestBody) {
        return new User(
                registerRequestBody.username(),
                registerRequestBody.email(),
                passwordEncoder.encode(registerRequestBody.password()),
                new LinkedList<>(),
                new LinkedList<>(),
                new LinkedList<>());
    }
}
