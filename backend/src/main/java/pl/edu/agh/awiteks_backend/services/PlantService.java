package pl.edu.agh.awiteks_backend.services;

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
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.repositories.PlantRepository;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;

@Service
public class PlantService {

    private final PlantRepository plantRepository;

    private final ListUtilities listUtilities;

    private final UserRepository userRepository;

    private final SpeciesRepository speciesRepository;

    @Autowired
    public PlantService(PlantRepository modelRepository,
                        UserRepository userRepository,
                        SpeciesRepository speciesRepository,
                        ListUtilities listUtilities
    ) {
        this.plantRepository = modelRepository;
        this.listUtilities = listUtilities;
        this.userRepository = userRepository;
        this.speciesRepository = speciesRepository;
    }

    public Plant addPlant(AddPlantRequestBody addPlantRequestBody, int userId) {
        // TODO custom exceptions, rewrite this once DB is ready
        final var plant = makePlantFromRequestBody(addPlantRequestBody, userId);

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
        // TODO move frontend logic to compute these stats here
        // TODO we can either aggregate this or compute every time
        final List<Plant> userPlants = getUsersPlants(userId);
        final var neglectedPlants = 5;
        final var wellGroomedPlants = 5;

        return new PlantsStats(userPlants.size(), neglectedPlants, wellGroomedPlants);
    }

    public Plant updatePlant(AddPlantRequestBody addPlantRequestBody,
                             int plantId, int userId) {
        final var plant = makePlantFromRequestBody(addPlantRequestBody, userId);
        plant.setId(plantId);

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
                "https://netscroll.pl/wp-content/uploads/2021/10/CactusToy1.jpg");
    }

}
