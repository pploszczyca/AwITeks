package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
