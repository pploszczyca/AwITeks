package pl.edu.agh.awiteks_backend.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMVCConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // TODO get this from env file or inject from elsewhere
        final String[] allowedOrigins = {
                "http://localhost:3000", // React dev server
                "http://127.0.0.1:3000"  // probably not needed
        };

        registry.addMapping("/**")
                .allowedMethods("*")
                .allowedOrigins(allowedOrigins);
    }
}
