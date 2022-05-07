package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.users.UserInfo;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.PlantRepository;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;
import pl.edu.agh.awiteks_backend.utilities.StreamUtilities;

@Service
public class UserService extends ModelService<User> {

    private final SpeciesRepository speciesRepository;
    private final PlantRepository plantRepository;
    private final StreamUtilities streamUtilities;

    @Autowired
    public UserService(UserRepository modelRepository,
                       SpeciesRepository speciesRepository,
                       PlantRepository plantRepository,
                       ListUtilities listUtilities, StreamUtilities streamUtilities) {
        super(modelRepository, listUtilities);
        this.speciesRepository = speciesRepository;
        this.plantRepository = plantRepository;
        this.streamUtilities = streamUtilities;
    }

    @Override
    public void remove(int id) {
        removeAllUserPlants(id);
        removeAllUserSpecies(id);
        super.remove(id);
    }

    public UserInfo getUserInfo(int userId) {
        // TODO error handling
        User user = get(userId).orElseThrow();
        return new UserInfo(user.getEmail(), user.getUsername());
    }

    private void removeAllUserPlants(int id) {
        super.get(id)
                .ifPresent(presentUser -> plantRepository.deleteAll(presentUser.getUserPlants()));
    }

    private void removeAllUserSpecies(int id) {
        streamUtilities
                .asStream(speciesRepository.findAll())
                .filter(species -> species.getCreatorId() == id)
                .forEach(speciesRepository::delete);
    }

}
