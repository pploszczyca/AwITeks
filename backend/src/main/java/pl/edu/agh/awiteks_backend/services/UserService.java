package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.Repository;

@Service
public class UserService extends ModelService<User> {

    private final Repository<Species> speciesRepository;
    private final Repository<Plant> plantRepository;

    @Autowired
    public UserService(Repository<User> modelRepository, Repository<Species> speciesRepository, Repository<Plant> plantRepository) {
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
                .ifPresent(presentUser -> presentUser
                        .getUserPlants()
                        .forEach(plantRepository::remove));
    }

    private void removeAllUserSpecies(int id) {
        speciesRepository
                .getAll()
                .stream()
                .filter(species -> species.getCreatorId() == id)
                .forEach(speciesRepository::remove);
    }
}
