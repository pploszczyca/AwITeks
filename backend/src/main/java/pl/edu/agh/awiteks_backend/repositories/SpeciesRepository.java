package pl.edu.agh.awiteks_backend.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.Species;

public interface SpeciesRepository extends CrudRepository<Species, Integer> {
    Optional<Species> findByIdAndCreatorId(int id, int creatorId);

    Boolean existsByIdAndCreatorId(int id, int creatorId);
}
