package pl.edu.agh.awiteks_backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import pl.edu.agh.awiteks_backend.models.AbstractModel;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.models.User;

import java.util.List;
import java.util.Optional;

public class UserRepository extends RepositoryImp<User> {

    private final Repository<Species> speciesRepository;
    private final Repository<Plant> plantRepository;

    @Autowired
    public UserRepository(List<AbstractModel<User>> abstractModels, Repository<Species> speciesRepository, Repository<Plant> plantRepository) {
        super(abstractModels);
        this.speciesRepository = speciesRepository;
        this.plantRepository = plantRepository;
    }

    @Autowired
    public UserRepository(Repository<Species> speciesRepository, Repository<Plant> plantRepository) {
        super();
        this.speciesRepository = speciesRepository;
        this.plantRepository = plantRepository;
    }

    @Override
    public void remove(User object) {
        remove(object.getId());
    }

    @Override
    public void remove(int userID) {
        removeAllUserPlants(userID);
        removeAllUserSpecies(userID);
        super.remove(userID);
    }

    private void removeAllUserPlants(int id) {
        Optional<User> user = super.get(id);
        user.ifPresent(presentUser -> presentUser
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
