package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.Activity;

public interface ActivityRepository extends CrudRepository<Activity, Integer> {
}
