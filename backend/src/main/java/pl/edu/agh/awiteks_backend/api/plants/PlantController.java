package pl.edu.agh.awiteks_backend.api.plants;

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

    @Operation(summary = "Get all plants")
    @GetMapping(produces = "application/json")
    public List<Plant> getAllPlants() {
        return plantService.getAll();
    }

    @Operation(summary = "Get plant by id")
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<Plant> getPlant(@PathVariable int id) {
        return plantService.get(id);
    }

    @Operation(summary = "Add new plant, assign it to specifier user and specie")
    @PostMapping
    @ResponseBody
    public Plant addPlant(@RequestBody AddPlantRequestBody plant) {
        // TODO creatorID from JWT
        return plantService.addPlant(plant, 0);
    }

    @Operation(summary = "Changing Favourite flag in plant")
    @PutMapping(path = "/{plantId}/toggle-favourite")
    @ResponseBody
    public void togglePlantFavourite(@PathVariable int plantId) {
        plantService.changeFavourite(plantId);
    }


    @Operation(summary = "Update plant")
    @PutMapping(path = "/{plantId}", consumes = "application/json")
    public Plant updatePlant(@RequestBody AddPlantRequestBody plantRequestBody, @PathVariable int plantId) {
        // TODO userId from JWT
        return plantService.updatePlant(plantRequestBody, plantId, 0);
    }

    @Operation(summary = "Delete plant by id")
    @DeleteMapping(value = "/{id}")
    public void removePlant(@PathVariable int id) {
        plantService.remove(id);
    }

    @Operation(summary = "Get photo URL of plant")
    @GetMapping(path = "/plants/{id}/URL")
    public String getURL(@PathVariable int id){
        Optional<Plant> plantOptional = plantService.get(id);
        if(plantOptional.isPresent()){
            return plantOptional.get().getUrl();
        }else{
            return "https://tatamariusz.pl/hans-christian-andersen-polny-kwiatek/#iLightbox[gallery3623]/0";
        }
    }

    @Operation(summary = "Get all plants summary")
    @GetMapping(value="/user/summary")
    public List<PlantSummary> getAllPlantsSummary(){
        // TODO user ID from JWT
        return plantService.getPlantSummaries(0);
    }

    @Operation(summary = "Get plant stats")
    @GetMapping(value = "/user/stats")
    public PlantsStats getPlantsStats() {
        // TODO user ID from JWT
        return plantService.getPlantsStats(0);
    }
}
