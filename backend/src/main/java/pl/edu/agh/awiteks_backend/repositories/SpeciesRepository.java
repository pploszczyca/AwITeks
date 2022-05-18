package pl.edu.agh.awiteks_backend.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.Species;

public interface SpeciesRepository extends CrudRepository<Species, Integer> {
    @Query("SELECT s " +
            "FROM Species AS s " +
            "WHERE s.id = ?1 AND s.creatorId IN (?2, -1)")  // -1 means that spiecie is public for everyone
    Optional<Species> findByIdAndCreatorId(int id, int creatorId);

    Boolean existsByIdAndCreatorId(int id, int creatorId);
}
