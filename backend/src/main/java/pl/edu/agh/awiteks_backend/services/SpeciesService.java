package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.species.AddSpeciesRequestBody;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.repositories.PlantRepository;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;
import pl.edu.agh.awiteks_backend.utilities.StreamUtilities;

import java.util.ArrayList;
import java.util.Objects;

@Service
public class SpeciesService extends ModelService<Species> {
    private final PlantRepository plantRepository;
    private final StreamUtilities streamUtilities;

    @Autowired
    public SpeciesService(SpeciesRepository speciesRepository,
                          PlantRepository plantRepository,
                          ListUtilities listUtilities,
                          StreamUtilities streamUtilities) {
        super(speciesRepository, listUtilities);
        this.plantRepository = plantRepository;
        this.streamUtilities = streamUtilities;
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
        return streamUtilities
                .asStream(plantRepository.findAll())
                .anyMatch(plant -> plant.getSpecies().getId() == speciesID);
    }

    private void updateSpeciesInPlant(Species species) {
        streamUtilities
                .asStream(plantRepository.findAll())
                .filter(plant -> Objects.equals(plant.getSpecies().getId(), species.getId()))
                .forEach(plant -> {
                    plant.setSpecies(species);
                    plantRepository.save(plant);
                });
    }
}
