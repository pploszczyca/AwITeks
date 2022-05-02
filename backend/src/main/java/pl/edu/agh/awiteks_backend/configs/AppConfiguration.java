package pl.edu.agh.awiteks_backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;
import pl.edu.agh.awiteks_backend.utilities.StreamUtilities;

@Configuration
public class AppConfiguration {

    @Bean
    @Scope("singleton")
    public StreamUtilities getStreamUtilities() {
        return new StreamUtilities();
    }

    @Bean
    @Scope("singleton")
    public ListUtilities getListUtilities() {
        return new ListUtilities();
    }
}
