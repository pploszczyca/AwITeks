package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.plants.body_models.AddPlantRequestBody;
import pl.edu.agh.awiteks_backend.api.plants.body_models.PlantSummary;
import pl.edu.agh.awiteks_backend.api.plants.body_models.PlantsStats;
import pl.edu.agh.awiteks_backend.mappers.PlantMapper;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.models.ActivityType;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.repositories.PlantRepository;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;
import pl.edu.agh.awiteks_backend.utilities.PlantValidator;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlantService {
    private final PlantRepository plantRepository;
    private final ListUtilities listUtilities;
    private final UserRepository userRepository;
    private final SpeciesRepository speciesRepository;
    private final PlantValidator plantValidator;

    @Autowired
    public PlantService(PlantRepository modelRepository,
                        UserRepository userRepository,
                        SpeciesRepository speciesRepository,
                        PlantValidator plantValidator,
                        ListUtilities listUtilities
    ) {
        this.plantRepository = modelRepository;
        this.userRepository = userRepository;
        this.speciesRepository = speciesRepository;
        this.plantValidator = plantValidator;
        this.listUtilities = listUtilities;
    }

    public Plant addPlant(AddPlantRequestBody addPlantRequestBody, int userId) {
        plantValidator.validateNewPlantRequest(addPlantRequestBody);
        var plant = makePlantFromRequestBody(addPlantRequestBody, userId);

        plant.addActivity(new Activity(
                plant,
                ActivityType.WATERING,
                addPlantRequestBody.lastWateringDate()));

        plant.addActivity(new Activity(
                plant,
                ActivityType.FERTILISATION,
                addPlantRequestBody.lastFertilizationDate()));

        addPlantToUserList(plant, userId);
        plantRepository.save(plant);

        return plant;
    }

    public List<Plant> getAll(int userId) {
        return this.listUtilities.iterableToList(plantRepository.findAllByUserId(userId));
    }

    public Optional<Plant> get(int id, int userId) {
        return this.plantRepository.findByIdAndUserId(id, userId);
    }

    public void remove(int id, int userId) {
        if (plantRepository.existsByIdAndUserId(id, userId)) {
            removePlantFromUserList(id);
            this.plantRepository.deleteById(id);
        }

    }

    public void changeFavourite(int plantId, int userId) {
        this.plantRepository
                .findByIdAndUserId(plantId, userId)
                .ifPresent(
                        plant -> {
                            plant.setFavourite(!plant.isFavourite());
                            this.plantRepository.save(plant);
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
        this.plantRepository
                .findById(id)
                .ifPresent(presentPlant ->
                        presentPlant
                                .getUser()
                                .removePlant(presentPlant)
                );
    }

    private List<Plant> getUsersPlants(int userId) {
        // TODO maybe create custom exception
        return listUtilities.iterableToList(plantRepository.findAllByUserId(userId));
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
        var plant = plantRepository
                .findByIdAndUserId(plantId, userId)
                .orElseThrow();

            plant.setName(addPlantRequestBody.name());
            plant.setActualInsolation(addPlantRequestBody.insolation());
            plant.setNote(addPlantRequestBody.note());
            // TODO handle all ...

            if (!plant.getLastFertilizationDate().equals(addPlantRequestBody.lastFertilizationDate())) {
                plant.addActivity(new Activity(
                        plant,
                        ActivityType.FERTILISATION,
                        addPlantRequestBody.lastFertilizationDate()));
            }

            if (!plant.getLastWateringDate().equals(addPlantRequestBody.lastWateringDate())) {
                plant.addActivity(new Activity(
                        plant,
                        ActivityType.WATERING,
                        addPlantRequestBody.lastWateringDate()));
            }

            plantRepository.save(plant);

            return plant;
    }

    private Plant makePlantFromRequestBody(AddPlantRequestBody addPlantRequestBody, int userId) {
        var species = speciesRepository.findByIdAndCreatorId(addPlantRequestBody.speciesId(), userId).orElseThrow();
        var user = userRepository.findById(userId).orElseThrow();

        var plant = new Plant(
                addPlantRequestBody.name(),
                user,
                species,
                addPlantRequestBody.note(),
                addPlantRequestBody.insolation(),
                new LinkedList<>(),
                false,
                "https://netscroll.pl/wp-content/uploads/2021/10/CactusToy1.jpg");

        return plant;
    }
}
