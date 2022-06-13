package pl.edu.agh.awiteks_backend.configs;

import java.text.SimpleDateFormat;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import pl.edu.agh.awiteks_backend.utilities.CalendarUtilities;
import pl.edu.agh.awiteks_backend.utilities.ForumUtilities;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;
import pl.edu.agh.awiteks_backend.utilities.PlantUtilities;
import pl.edu.agh.awiteks_backend.utilities.StreamUtilities;
import pl.edu.agh.awiteks_backend.utilities.UserDataValidationUtilities;


@Configuration
public class AppConfiguration {

    private static final String DATE_FORMAT = "yyyy-MM-dd";

    @Bean
    @Scope("singleton")
    public SimpleDateFormat getSimpleDateFormat() {
        return new SimpleDateFormat(DATE_FORMAT);
    }

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

    @Bean
    @Scope("singleton")
    public UserDataValidationUtilities getUserValidationUtilities() {
        return new UserDataValidationUtilities();
    }

    @Bean
    @Scope("singleton")
    public PlantUtilities getPlantUtilities(SimpleDateFormat simpleDateFormat) {
        return new PlantUtilities(simpleDateFormat);
    }

    @Bean
    @Scope("singleton")
    public CalendarUtilities getCalendarUtilities(
            SimpleDateFormat simpleDateFormat) {
        return new CalendarUtilities(simpleDateFormat);
    }

    @Bean
    @Scope("singleton")
    public ForumUtilities getForumUtilities() {
        return new ForumUtilities();
    }


}
