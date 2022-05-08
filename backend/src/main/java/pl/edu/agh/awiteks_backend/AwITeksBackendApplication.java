package pl.edu.agh.awiteks_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;

@SpringBootApplication
public class AwITeksBackendApplication {

    private final UserRepository userRepository;

    @Autowired
    public AwITeksBackendApplication(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(AwITeksBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {
            User user = new User();
            user.setUsername("admin");
            user.setPassword("$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG");
            userRepository.save(new User());
        };
    }
}
