package pl.edu.agh.awiteks_backend.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.ForumThread;

public interface ForumRepository extends CrudRepository<ForumThread, Integer> {
    Optional<ForumThread> findByIdAndUserId(int id, int userId);

    Iterable<ForumThread> findAllByUserId(int userId);

    Boolean existsByIdAndUserId(int id, int userId);
}
