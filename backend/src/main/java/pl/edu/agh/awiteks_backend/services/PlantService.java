package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.Repository;

@Service
public class PlantService extends ModelService<Plant> {

    private final Repository<User> userRepository;

    private final Repository<Species> speciesRepository;

    @Autowired
    public PlantService(Repository<Plant> modelRepository, Repository<User> userRepository, Repository<Species> speciesRepository) {
        super(modelRepository);
        this.userRepository = userRepository;
        this.speciesRepository = speciesRepository;
    }

    public void add(Plant plant, int userId, int speciesId) {
        this.speciesRepository.get(speciesId).ifPresent(plant::setSpiece);
        addPlantToUserList(plant, userId);
        add(plant);
    }

    @Override
    public void remove(int id) {
        removePlantFromUserList(id);
        super.remove(id);
    }

    public void changeFavourite(int plantId){
        this.get(plantId).ifPresent(
                plant -> {
                    System.out.println(plant.isFavourite());
                    plant.setFavourite(!plant.isFavourite());
                    update(plant);
                }
        );
    }

    private void addPlantToUserList(Plant plant, int userId) {
        userRepository
                .get(userId)
                .ifPresent(presentUser -> {
                    presentUser.addPlant(plant);
                    plant.setUser(presentUser);
                });
    }

    private void removePlantFromUserList(int id) {
        super.get(id).ifPresent(presentPlant ->
                presentPlant
                        .getUser()
                        .removePlant(presentPlant)
        );
    }
}
