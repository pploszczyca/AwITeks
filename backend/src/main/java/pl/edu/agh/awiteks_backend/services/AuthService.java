package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.auth.AuthData;
import pl.edu.agh.awiteks_backend.api.auth.UserLoginRequestBody;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.security.jwt.TokenService;

@Service
public class AuthService {
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(TokenService tokenService, UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    public AuthData authenticateUser(UserLoginRequestBody userLoginRequest) {
        User user = assertValidCredentials(userLoginRequest.email(), userLoginRequest.password());
        JwtAccessToken token = tokenService.createAccessToken(user.getId());

        return new AuthData(token.getCredentials(), token.getExpireTime());
    }

    private User assertValidCredentials(String email, String password) {
        // TODO throw exception that will return 401 if invalid
        // password is plaintext here
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return userRepository.findByUsername(email).orElseThrow();
    }
}
