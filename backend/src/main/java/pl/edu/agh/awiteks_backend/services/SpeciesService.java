package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.species.body_models.AddSpeciesRequestBody;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;
import pl.edu.agh.awiteks_backend.utilities.StreamUtilities;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SpeciesService {
    private final SpeciesRepository speciesRepository;
    private final StreamUtilities streamUtilities;

    @Autowired
    public SpeciesService(SpeciesRepository speciesRepository,
                          StreamUtilities streamUtilities) {
        this.speciesRepository = speciesRepository;
        this.streamUtilities = streamUtilities;
    }

    public List<Species> getAll(int creatorId) {
        return streamUtilities
                .asStream(speciesRepository.findAll())
                .filter(species -> species.getCreatorId() == Species.NO_CREATOR || species.getCreatorId() == creatorId)
                .toList();
    }

    public Optional<Species> get(int id, int creatorId) {
        return speciesRepository.findByIdAndCreatorId(id, creatorId);
    }

    public void remove(int id, int creatorId) {
        if (this.speciesRepository.existsByIdAndCreatorId(id, creatorId)) {
            this.speciesRepository.deleteById(id);
        }
    }

    public void update(Species object, int creatorId) {
        if (this.speciesRepository.existsByIdAndCreatorId(object.getId(), creatorId)) {
            this.speciesRepository.save(object);
        }
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

        this.speciesRepository.save(species);
        return species;
    }
}
