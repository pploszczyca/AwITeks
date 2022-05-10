package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.Species;

import java.util.Optional;

public interface SpeciesRepository extends CrudRepository<Species, Integer> {
    Optional<Species> findByIdAndCreatorId(int id, int creatorId);
    Boolean existsByIdAndCreatorId(int id, int creatorId);
}
