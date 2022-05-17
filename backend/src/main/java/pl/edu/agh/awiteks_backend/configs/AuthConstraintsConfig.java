package pl.edu.agh.awiteks_backend.configs;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthConstraintsConfig {

    @Bean(name = "jwtExcludedRoutes")
    public List<String> configureJwtExcludedRoutes() {
        return List.of(
                "/auth/.*",             // auth endpoints
                "/v3/.*",               // swagger endpoints
                "/swagger-ui/.*"        // swagger UI
        );
    }
}
