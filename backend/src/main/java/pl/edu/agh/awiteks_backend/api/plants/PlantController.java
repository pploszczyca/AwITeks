package pl.edu.agh.awiteks_backend.api.plants;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.services.PlantService;

import java.util.List;
import java.util.Optional;

import static pl.edu.agh.awiteks_backend.configs.SwaggerConfig.JWT_AUTH;

@RestController
@RequestMapping("/plants")
public class PlantController {
    private final PlantService plantService;

    @Autowired
    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @Operation(summary = "Get all plants", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(produces = "application/json")
    public List<Plant> getAllPlants() {
        // TODO see note in UserController
        return plantService.getAll();
    }

    @Operation(summary = "Get plant by id", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<Plant> getPlant(@PathVariable int id) {
        // TODO validate ownership
        return plantService.get(id);
    }

    @Operation(summary = "Add new plant, assign it to specifier user and specie",
               security = @SecurityRequirement(name = JWT_AUTH))
    @PostMapping
    @ResponseBody
    public Plant addPlant(JwtAccessToken creatorAccessToken, @RequestBody AddPlantRequestBody plant) {
        return plantService.addPlant(plant, creatorAccessToken.getUserId());
    }

    @Operation(summary = "Changing Favourite flag in plant", security = @SecurityRequirement(name = JWT_AUTH))
    @PutMapping(path = "/{plantId}/toggle-favourite")
    @ResponseBody
    public void togglePlantFavourite(@PathVariable int plantId) {
        // TODO validate ownership
        plantService.changeFavourite(plantId);
    }


    @Operation(summary = "Update plant", security = @SecurityRequirement(name = JWT_AUTH))
    @PutMapping(path = "/{plantId}", consumes = "application/json")
    public Plant updatePlant(JwtAccessToken accessToken,
                             @RequestBody AddPlantRequestBody addPlantRequestBody,
                             @PathVariable int plantId
    ) {
        return plantService.updatePlant(addPlantRequestBody, plantId, accessToken.getUserId());
    }

    @Operation(summary = "Delete plant by id", security = @SecurityRequirement(name = JWT_AUTH))
    @DeleteMapping(value = "/{id}")
    public void removePlant(@PathVariable int id) {
        // TODO validate ownership
        plantService.remove(id);
    }

    @Operation(summary = "Get all plants summary", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(value="/summary")
    public List<PlantSummary> getAllPlantsSummary(JwtAccessToken accessToken){
        return plantService.getPlantSummaries(accessToken.getUserId());
    }

    @Operation(summary = "Get plant stats", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(value = "/stats")
    @SecurityRequirement(name = "JWT")
    public PlantsStats getPlantsStats(JwtAccessToken accessToken) {
        return plantService.getPlantsStats(accessToken.getUserId());
    }
}
