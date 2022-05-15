package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.ForumThread;

public interface ForumRepository extends CrudRepository<ForumThread, Integer> {
}
