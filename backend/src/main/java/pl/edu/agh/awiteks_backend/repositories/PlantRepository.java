package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.Plant;

public interface PlantRepository extends CrudRepository<Plant, Integer> {
}
