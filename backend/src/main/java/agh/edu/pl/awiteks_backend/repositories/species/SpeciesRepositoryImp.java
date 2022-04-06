package agh.edu.pl.awiteks_backend.repositories.species;

import agh.edu.pl.awiteks_backend.models.Species;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class SpeciesRepositoryImp implements SpeciesRepository {
    private List<Species> speciesList;


    public SpeciesRepositoryImp(List<Species> speciesList) {
        this.speciesList = speciesList;
    }

    public SpeciesRepositoryImp() {
        this(new ArrayList<Species>());
    }

    @Override
    public void add(Species species) {
        speciesList.add(species);
    }

    @Override
    public void remove(Species species) {
        speciesList.remove(species);
    }

    @Override
    public void remove(int speciesID) {
        Optional<Species> speciesToDelete = speciesList
                .stream()
                .filter(species -> species.getId() == speciesID)
                .findFirst();

        speciesToDelete.ifPresent(species -> speciesList.remove(species));
    }

    @Override
    public Optional<Species> get(int speciesID) {
        return speciesList.stream().filter(species -> species.getId() == speciesID).findFirst();
    }

    @Override
    public List<Species> getAll() {
        return this.speciesList.stream().map(Species::copy).toList();
    }

    @Override
    public void update(Species species) {
        int index = speciesList.indexOf(species);
        speciesList.set(index, species);
    }
}
