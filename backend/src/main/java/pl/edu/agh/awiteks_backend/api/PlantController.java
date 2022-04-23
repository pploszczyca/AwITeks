package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PlantController extends ModelController<Plant> {
    private final Repository<User> userRepository;
    private final Repository<Species> speciesRepository;

    @Autowired
    public PlantController(Repository<Plant> modelRepository, Repository<User> userRepository, Repository<Species> speciesRepository) {
        super(modelRepository);
        this.userRepository = userRepository;
        this.speciesRepository = speciesRepository;
    }

    @Override
    @Operation(summary = "Get all plants", operationId = "getAllPlants")
    @GetMapping(value = "/plants", produces = "application/json")
    public List<Plant> getAll() {
        return super.getAll();
    }

    @Override
    @Operation(summary = "Get plant by id", operationId = "getPlant")
    @GetMapping(value = "/plants/{id}", produces = "application/json")
    public Optional<Plant> get(@PathVariable int id) {
        return super.get(id);
    }

    @Operation(summary = "Add new plant, assign it to specifier user and specie", operationId = "addPlant")
    @PostMapping(path = "/plants/{userId}/{speciesId}")
    @ResponseBody
    public String add(@RequestBody Plant plant, @PathVariable int userId, @PathVariable int speciesId) {
        this.speciesRepository.get(speciesId).ifPresent(plant::setSpiece);
        addPlantToUserList(plant, userId);
        return super.add(plant);
    }

    @Override
    @Operation(summary = "Update plant", operationId = "updatePlant")
    @PutMapping(value = "/plants", consumes = "application/json")
    public void update(@RequestBody Plant plant) {
        super.update(plant);
    }

    @Override
    @Operation(summary = "Delete plant by id", operationId = "removePlant")
    @DeleteMapping(value = "/plants/{id}")
    public void remove(@PathVariable int id) {
        removePLantFromUserList(id);
        super.remove(id);
    }

    private void removePLantFromUserList(int id) {
        Optional<Plant> plant = super.get(id);
        plant.ifPresent(presentPlant -> {
            User user = presentPlant.getUser();
            user.removePlant(presentPlant);
        });
    }

    private void addPlantToUserList(Plant plant, int userId) {
        Optional<User> user = userRepository.get(userId);
        user.ifPresent(presentUser -> {
            presentUser.addPlant(plant);
            plant.setUser(presentUser);
        });
    }
}
