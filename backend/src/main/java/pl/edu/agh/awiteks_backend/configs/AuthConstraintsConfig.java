package pl.edu.agh.awiteks_backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class AuthConstraintsConfig {

    @Bean(name = "jwtExcludedRoutes")
    public List<String> configureJwtExcludedRoutes() {
        return List.of(
                "/auth/login",
                "/auth/register"
            );
    }
}
