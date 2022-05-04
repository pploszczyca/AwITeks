package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.Species;

public interface SpeciesRepository extends CrudRepository<Species, Integer> {
}
