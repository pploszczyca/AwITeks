package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.species.AddSpeciesRequestBody;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.repositories.PlantRepository;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;

import java.util.ArrayList;
import java.util.Objects;
import java.util.stream.StreamSupport;

@Service
public class SpeciesService extends ModelService<Species> {
    private final PlantRepository plantRepository;

    @Autowired
    public SpeciesService(SpeciesRepository speciesRepository, PlantRepository plantRepository) {
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
                addSpeciesRequestBody.name(),
                addSpeciesRequestBody.maxAge(),
                addSpeciesRequestBody.neededInsolation(),
                addSpeciesRequestBody.waterDose(),
                addSpeciesRequestBody.waterRoutine(),
                addSpeciesRequestBody.fertilizationRoutine(),
                addSpeciesRequestBody.fertilizationDose(),
                creatorId,
                new ArrayList<>());

        add(species);
        return species;
    }

    private boolean checkIfPlantExist(int speciesID) {
        return StreamSupport
                .stream(plantRepository.findAll().spliterator(), false)
                .anyMatch(plant -> plant.getSpiece().getId() == speciesID);
    }

    private void updateSpeciesInPlant(Species species) {
        StreamSupport
                .stream(plantRepository.findAll().spliterator(), false)
                .filter(plant -> Objects.equals(plant.getSpiece().getId(), species.getId()))
                .forEach(plant -> {
                    plant.setSpiece(species);
                    plantRepository.save(plant);
                });
    }
}
