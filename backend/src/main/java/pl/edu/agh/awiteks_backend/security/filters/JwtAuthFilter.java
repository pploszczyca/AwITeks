package pl.edu.agh.awiteks_backend.security.filters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.edu.agh.awiteks_backend.security.UnauthorizedException;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.security.jwt.TokenService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private static final String JWT_AUTH_PREFIX = "Bearer";

    private final TokenService tokenService;
    private final List<String> excludedRoutes;

    @Autowired
    public JwtAuthFilter(TokenService tokenService, @Value("#{jwtExcludedRoutes}") List<String> excludedRoutes) {
        super();
        this.tokenService = tokenService;
        this.excludedRoutes = excludedRoutes;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException
    {
        if (applies(request)) {
            try {
                authenticateWithJwt(request);
            } catch (Exception exception) {
                throw new UnauthorizedException(exception.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }


    private void authenticateWithJwt(HttpServletRequest request) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith(JWT_AUTH_PREFIX)) {
            throw new SecurityException("Expected Authorization header with prefix: " + JWT_AUTH_PREFIX);
        }

        String token = authHeader.substring(JWT_AUTH_PREFIX.length());
        JwtAccessToken jwtAccessToken = tokenService.parseAccessToken(token);
        SecurityContextHolder.getContext().setAuthentication(jwtAccessToken);
    }

    private boolean applies(HttpServletRequest request) {
        // this is probably not the most elegant solution but will work for now (feel free to rewrite)
        return excludedRoutes.stream()
                .filter(route -> route.equals(request.getServletPath()))
                .findAny()
                .isEmpty();
    }
}
