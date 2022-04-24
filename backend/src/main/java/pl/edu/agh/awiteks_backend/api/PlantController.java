package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.services.PlantService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/plants")
public class PlantController {
    private final PlantService plantService;

    @Autowired
    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @Operation(summary = "Get all plants", operationId = "getAllPlants")
    @GetMapping(produces = "application/json")
    public List<Plant> getAllPlants() {
        return plantService.getAll();
    }

    @Operation(summary = "Get plant by id", operationId = "getPlant")
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<Plant> getPlant(@PathVariable int id) {
        return plantService.get(id);
    }

    @Operation(summary = "Add new plant, assign it to specifier user and specie", operationId = "addPlant")
    @PostMapping(path = "/{userId}/{speciesId}")
    @ResponseBody
    public void addPlant(@RequestBody Plant plant, @PathVariable int userId, @PathVariable int speciesId) {
        plantService.add(plant, userId, speciesId);
    }

    @Operation(summary = "Update plant", operationId = "updatePlant")
    @PutMapping(consumes = "application/json")
    public void updatePlant(@RequestBody Plant plant) {
        plantService.update(plant);
    }

    @Operation(summary = "Delete plant by id", operationId = "removePlant")
    @DeleteMapping(value = "/{id}")
    public void removePlant(@PathVariable int id) {
        plantService.remove(id);
    }
}
