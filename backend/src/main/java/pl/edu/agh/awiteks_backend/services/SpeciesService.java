package pl.edu.agh.awiteks_backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.species.body_models.AddSpeciesRequestBody;
import pl.edu.agh.awiteks_backend.mappers.SpeciesMapper;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;

@Service
public class SpeciesService {
    private final SpeciesRepository speciesRepository;

    private final SpeciesMapper speciesMapper;

    private final ListUtilities listUtilities;

    @Autowired
    public SpeciesService(SpeciesRepository speciesRepository,
                          SpeciesMapper speciesMapper,
                          ListUtilities listUtilities) {
        this.speciesRepository = speciesRepository;
        this.speciesMapper = speciesMapper;
        this.listUtilities = listUtilities;
    }

    public List<Species> getAll(int creatorId) {
        return listUtilities
                .iterableToList(
                        speciesRepository.findAllByCreatorId(creatorId));
    }

    public Optional<Species> get(int id, int creatorId) {
        return speciesRepository.findByIdAndCreatorId(id, creatorId);
    }

    public void remove(int id, int creatorId) {
        this.speciesRepository.deleteByIdAndCreatorId(id, creatorId);
    }

    public void update(Species object, int creatorId) {
        if (this.speciesRepository.existsByIdAndCreatorId(object.getId(),
                creatorId)) {
            this.speciesRepository.save(object);
        }
    }

    public Species addSpecies(AddSpeciesRequestBody addSpeciesRequestBody,
                              int creatorId) {
        final var species =
                speciesMapper.fromAddRequestBodyToSpecies(addSpeciesRequestBody,
                        creatorId, new ArrayList<>());

        this.speciesRepository.save(species);
        return species;
    }
}
