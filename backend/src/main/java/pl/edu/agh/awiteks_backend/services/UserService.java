package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.PlantRepository;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;

import java.util.stream.StreamSupport;

@Service
public class UserService extends ModelService<User> {

    private final SpeciesRepository speciesRepository;
    private final PlantRepository plantRepository;

    @Autowired
    public UserService(UserRepository modelRepository, SpeciesRepository speciesRepository, PlantRepository plantRepository) {
        super(modelRepository);
        this.speciesRepository = speciesRepository;
        this.plantRepository = plantRepository;
    }

    @Override
    public void remove(int id) {
        removeAllUserPlants(id);
        removeAllUserSpecies(id);
        super.remove(id);
    }

    private void removeAllUserPlants(int id) {
        super.get(id)
                .ifPresent(presentUser -> plantRepository.deleteAll(presentUser.getUserPlants()));
    }

    private void removeAllUserSpecies(int id) {
        StreamSupport.stream(speciesRepository
                        .findAll().spliterator(), false)
                .filter(species -> species.getCreatorId() == id)
                .forEach(speciesRepository::delete);
    }
}
