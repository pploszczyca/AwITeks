package agh.edu.pl.awiteks_backend.repositories.species;

import agh.edu.pl.awiteks_backend.models.Species;

import java.util.List;
import java.util.Optional;

public interface SpeciesRepository {
    void add(Species species);

    void remove(Species species);

    void remove(int speciesID);

    Optional<Species> get(int speciesID);

    List<Species> getAll();

    void update(Species species);
}
