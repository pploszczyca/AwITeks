package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.repositories.Repository;

import java.util.Optional;

@RestController
public class ActivityController {
    private final Repository<Plant> plantRepository;

    @Autowired
    public ActivityController(Repository<Plant> plantRepository) {
        this.plantRepository = plantRepository;
    }

    @Operation(summary = "Add new activity to plant", operationId = "addActivity")
    @PostMapping("/activity/{plantID}")
    public void add(@RequestBody Activity activity, @PathVariable int plantID) {
        Optional<Plant> plant = plantRepository.get(plantID);
        plant.ifPresent(plant1 -> plant1.addActivity(activity));
    }

    @Operation(summary = "Delete activity", operationId = "removeActivity")
    @DeleteMapping("/activity/{plantId}/{activityId}")
    public void remove(@PathVariable int plantId, @PathVariable int activityId) {
        plantRepository.get(plantId).ifPresent(plant -> plant.removeActivity(activityId));
    }

}
