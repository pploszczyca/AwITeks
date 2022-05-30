package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.ForumPost;

public interface PostRepository extends CrudRepository<ForumPost, Integer> {
}

