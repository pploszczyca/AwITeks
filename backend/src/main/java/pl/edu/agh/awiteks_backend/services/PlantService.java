package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.plants.AddPlantRequestBody;
import pl.edu.agh.awiteks_backend.api.plants.PlantSummary;
import pl.edu.agh.awiteks_backend.api.plants.PlantsStats;
import pl.edu.agh.awiteks_backend.mappers.PlantMapper;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.PlantRepository;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlantService extends ModelService<Plant> {

    private final UserRepository userRepository;

    private final SpeciesRepository speciesRepository;

    @Autowired
    public PlantService(PlantRepository modelRepository,
                        UserRepository userRepository,
                        SpeciesRepository speciesRepository,
                        ListUtilities listUtilities
    ) {
        super(modelRepository, listUtilities);
        this.userRepository = userRepository;
        this.speciesRepository = speciesRepository;
    }

    public Plant addPlant(AddPlantRequestBody addPlantRequestBody, int userId) {
        // TODO custom exceptions, rewrite this once DB is ready
        var spiece = speciesRepository.findById(addPlantRequestBody.speciesId()).orElseThrow();
        var user = userRepository.findById(userId).orElseThrow();

        var plant = new Plant(
                addPlantRequestBody.name(),
                user,
                spiece,
                addPlantRequestBody.note(),
                addPlantRequestBody.insolation(),
                new LinkedList<>(),
                false,
                "https://netscroll.pl/wp-content/uploads/2021/10/CactusToy1.jpg");

        addPlantToUserList(plant, userId);
        add(plant);

        return plant;
    }

    @Override
    public void remove(int id) {
        removePlantFromUserList(id);
        super.remove(id);
    }

    public void changeFavourite(int plantId) {
        this.get(plantId).ifPresent(
                plant -> {
                    plant.setFavourite(!plant.isFavourite());
                    update(plant);
                }
        );
    }

    private void addPlantToUserList(Plant plant, int userId) {
        userRepository
                .findById(userId)
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

    private List<Plant> getUsersPlants(int userId) {
        // TODO maybe create custom exception
        return userRepository.findById(userId)
                .map(User::getUserPlants)
                .orElseThrow(() -> new IllegalArgumentException("no such user"));
    }

    public List<PlantSummary> getPlantSummaries(int userId) {
        return getUsersPlants(userId).stream()
                .map(PlantMapper::plantToPlantSummary)
                .collect(Collectors.toList());
    }

    public PlantsStats getPlantsStats(int userId) {
        // TODO move frontend logic to compute these stats here
        // TODO we can either aggregate this or compute every time
        List<Plant> userPlants = getUsersPlants(userId);

        return new PlantsStats(userPlants.size(), 5, 5);
    }

    public Plant updatePlant(AddPlantRequestBody addPlantRequestBody, int plantId, int userId) {
        // TODO assert that the plant belongs to that user
        // TODO update plant based on the request data (overwrite all)
        return get(plantId).orElseThrow();
    }
}
