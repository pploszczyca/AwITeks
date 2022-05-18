package pl.edu.agh.awiteks_backend.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
