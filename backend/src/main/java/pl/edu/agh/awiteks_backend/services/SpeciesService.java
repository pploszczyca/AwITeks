package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.species.AddSpeciesRequestBody;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.repositories.Repository;

@Service
public class SpeciesService extends ModelService<Species> {
    private final Repository<Plant> plantRepository;

    @Autowired
    public SpeciesService(Repository<Species> speciesRepository, Repository<Plant> plantRepository) {
        super(speciesRepository);
        this.plantRepository = plantRepository;
    }

    @Override
    public void remove(int id) {
        if (!checkIfPlantExist(id)) {
            super.remove(id);
        }
    }

    @Override
    public void update(Species object) {
        super.update(object);
        updateSpeciesInPlant(object);
    }

    public Species addSpecies(AddSpeciesRequestBody addSpeciesRequestBody, int creatorId) {
        var species = new Species(
                (int)(Math.random() * 99999 + 1790), // xD
                addSpeciesRequestBody.name(),
                addSpeciesRequestBody.maxAge(),
                addSpeciesRequestBody.neededInsolation(),
                addSpeciesRequestBody.waterDose(),
                addSpeciesRequestBody.waterRoutine(),
                addSpeciesRequestBody.fertilizationRoutine(),
                addSpeciesRequestBody.fertilizationDose(),
                creatorId);

        add(species);
        return species;
    }

    private boolean checkIfPlantExist(int speciesID) {
        return plantRepository
                .getAll()
                .stream()
                .anyMatch(plant -> plant.getSpiece().getId() == speciesID);
    }

    private void updateSpeciesInPlant(Species species) {
        plantRepository
                .getAll()
                .stream()
                .filter(plant -> plant.getSpiece().getId() == species.getId())
                .forEach(plant -> {
                    plant.setSpiece(species);
                    plantRepository.update(plant);
                });
    }
}
