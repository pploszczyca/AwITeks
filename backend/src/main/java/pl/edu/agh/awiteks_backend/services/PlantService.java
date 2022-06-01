package pl.edu.agh.awiteks_backend.services;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
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
import pl.edu.agh.awiteks_backend.utilities.PlantUtilities;
import pl.edu.agh.awiteks_backend.utilities.PlantValidator;

@Service
public class PlantService {
    private final PlantRepository plantRepository;

    private final ListUtilities listUtilities;

    private final UserRepository userRepository;

    private final SpeciesRepository speciesRepository;

    private final PlantValidator plantValidator;

    private final PlantUtilities plantUtilities;

    @Autowired
    public PlantService(PlantRepository modelRepository,
                        UserRepository userRepository,
                        SpeciesRepository speciesRepository,
                        PlantValidator plantValidator,
                        ListUtilities listUtilities,
                        PlantUtilities plantUtilities) {
        this.plantRepository = modelRepository;
        this.userRepository = userRepository;
        this.speciesRepository = speciesRepository;
        this.plantValidator = plantValidator;
        this.listUtilities = listUtilities;
        this.plantUtilities = plantUtilities;
    }

    public Plant addPlant(AddPlantRequestBody addPlantRequestBody, int userId) {
        plantValidator.validateNewPlantRequest(addPlantRequestBody);
        final var plant = makePlantFromRequestBody(addPlantRequestBody, userId);

        addPlantActivities(plant, addPlantRequestBody,
                List.of(ActivityType.values()));
        addPlantToUserList(plant, userId);
        plantRepository.save(plant);

        return plant;
    }

    public List<Plant> getAll(int userId) {
        return this.listUtilities.iterableToList(
                plantRepository.findAllByUserId(userId));
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

    public void changeReminders(int plantId, int userId) {
        this.plantRepository
                .findByIdAndUserId(plantId, userId)
                .ifPresent(
                        plant -> {
                            plant.toggleSendReminders();
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
        return listUtilities.iterableToList(
                plantRepository.findAllByUserId(userId));
    }

    public List<PlantSummary> getPlantSummaries(int userId) {
        return getUsersPlants(userId).stream()
                .map(PlantMapper::plantToPlantSummary)
                .collect(Collectors.toList());
    }

    public PlantsStats getPlantsStats(int userId) {
        final var user = userRepository.findById(userId).orElseThrow();
        final var plantsNumber = user.getUserPlants().size();
        final var neglectedPlants =
                plantUtilities.getNumberOfNeglectedPlants(user);
        final var wellGroomedPlants = plantsNumber - neglectedPlants;

        return new PlantsStats(plantsNumber, neglectedPlants,
                wellGroomedPlants);
    }

    public Plant updatePlant(AddPlantRequestBody addPlantRequestBody,
                             int plantId, int userId) {
        final var plant = plantRepository
                .findByIdAndUserId(plantId, userId)
                .orElseThrow();

        final var species =
                speciesRepository.findById(addPlantRequestBody.speciesId())
                        .orElseThrow();
        plant.setName(addPlantRequestBody.name());
        plant.setActualInsolation(addPlantRequestBody.insolation());
        plant.setNote(addPlantRequestBody.note());
        plant.setSpecies(species);
        fixPlantActivities(plant, addPlantRequestBody);
        plantRepository.save(plant);

        return plant;
    }

    private Plant makePlantFromRequestBody(
            AddPlantRequestBody addPlantRequestBody, int userId) {
        final var species = speciesRepository.findByIdAndCreatorId(
                addPlantRequestBody.speciesId(), userId).orElseThrow();
        final var user = userRepository.findById(userId).orElseThrow();

        return new Plant(
                addPlantRequestBody.name(),
                user,
                species,
                addPlantRequestBody.note(),
                addPlantRequestBody.insolation(),
                new LinkedList<>(),
                false,
                addPlantRequestBody.photo());
    }

    private void fixPlantActivities(Plant plant,
                                    AddPlantRequestBody addPlantRequestBody) {
        final var activityTypesToFix = Arrays.stream(ActivityType.values())
                .filter(activityType -> shouldCreateActivity(plant,
                        addPlantRequestBody, activityType))
                .collect(Collectors.toList());

        addPlantActivities(plant, addPlantRequestBody, activityTypesToFix);
    }

    private void addPlantActivities(Plant plant,
                                    AddPlantRequestBody addPlantRequestBody,
                                    List<ActivityType> activityTypes) {
        activityTypes.stream()
                .map(activityType -> createActivityFromAddPlantRequest(plant,
                        addPlantRequestBody, activityType))
                .forEach(plant::addActivity);
    }

    private Activity createActivityFromAddPlantRequest(Plant plant,
                                                       AddPlantRequestBody addPlantRequestBody,
                                                       ActivityType activityType
    ) {
        return switch (activityType) {
            case WATERING -> new Activity(plant, activityType,
                    addPlantRequestBody.lastWateringDate());
            case FERTILISATION -> new Activity(plant, activityType,
                    addPlantRequestBody.lastFertilizationDate());
        };
    }

    private boolean shouldCreateActivity(Plant plant,
                                         AddPlantRequestBody addPlantRequestBody,
                                         ActivityType activityType
    ) {
        return switch (activityType) {
            case WATERING -> !plant.getLastWateringDate()
                    .equals(addPlantRequestBody.lastWateringDate());
            case FERTILISATION -> !plant.getLastFertilizationDate()
                    .equals(addPlantRequestBody.lastFertilizationDate());
        };
    }

    public String getPhoto(int plantId, int userId) {
        return plantRepository
                .findByIdAndUserId(plantId, userId)
                .orElseThrow()
                .getPhoto();
    }

    public Plant setPhoto(int plantId, int userId, String base64String) {
        final Plant plant = plantRepository.findByIdAndUserId(plantId, userId)
                .orElseThrow();
        plant.setPhoto(base64String);
        return plant;
    }
}
