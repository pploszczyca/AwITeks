package pl.edu.agh.awiteks_backend.repositories;

import pl.edu.agh.awiteks_backend.models.AbstractModel;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.Species;

import java.util.List;

public class SpeciesRepository extends RepositoryImp<Species> {

    private final Repository<Plant> plantRepository;

    public SpeciesRepository(List<AbstractModel<Species>> abstractModels, Repository<Plant> plantRepository) {
        super(abstractModels);
        this.plantRepository = plantRepository;
    }

    public SpeciesRepository(Repository<Plant> plantRepository) {
        this.plantRepository = plantRepository;
    }

    @Override
    public void remove(int speciesID) {
        if (!checkIfPlantExist(speciesID)) {
            super.remove(speciesID);
        }
    }

    private boolean checkIfPlantExist(int speciesID) {
        return plantRepository
                .getAll()
                .stream()
                .anyMatch(plant1 -> plant1.getSpecies().getId() == speciesID);
    }

}
