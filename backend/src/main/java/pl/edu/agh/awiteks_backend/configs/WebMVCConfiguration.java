package pl.edu.agh.awiteks_backend.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMVCConfiguration implements WebMvcConfigurer {

    @Value("${" + EnvNames.REACT_DEV_SERVER_URL + "}")
    private String reactDevServerUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*")
                .allowedOrigins(reactDevServerUrl);
    }
}
