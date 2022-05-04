package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {
}
