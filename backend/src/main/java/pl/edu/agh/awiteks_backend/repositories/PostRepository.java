package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import java.util.Optional;

public interface PostRepository extends CrudRepository<ForumPost, Integer> {
    Optional<ForumPost> findByIdAndUserId(int id, int userId);

    Iterable<ForumPost> findAllByUserId(int userId);

    Boolean existsByIdAndUserId(int id, int userId);
}

