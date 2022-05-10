package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.Plant;

import java.util.Optional;

public interface PlantRepository extends CrudRepository<Plant, Integer> {
    Optional<Plant> findByIdAndUserId(int id, int userId);

    Iterable<Plant> findAllByUserId(int userId);

    Boolean existsByIdAndUserId(int id, int userId);
}
