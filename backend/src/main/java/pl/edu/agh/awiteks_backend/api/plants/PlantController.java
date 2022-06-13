package pl.edu.agh.awiteks_backend.api.plants;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.awiteks_backend.api.plants.body_models.AddPlantRequestBody;
import pl.edu.agh.awiteks_backend.api.plants.body_models.PlantSummary;
import pl.edu.agh.awiteks_backend.api.plants.body_models.PlantsStats;
import static pl.edu.agh.awiteks_backend.configs.SwaggerConfig.JWT_AUTH;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.services.PlantService;

@RestController
@RequestMapping("/plants")
@RequiredArgsConstructor
public class PlantController {
    private final PlantService plantService;

    @Operation(summary = "Get all plants", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(produces = "application/json")
    public List<Plant> getAllPlants(JwtAccessToken jwtAccessToken) {
        return plantService.getAll(jwtAccessToken.getUserId());
    }

    @Operation(summary = "Get plant by id", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<Plant> getPlant(JwtAccessToken jwtAccessToken,
                                    @PathVariable int id) {
        return plantService.get(id, jwtAccessToken.getUserId());
    }

    @Operation(summary = "Add new plant, assign it to specifier user and specie",
            security = @SecurityRequirement(name = JWT_AUTH))
    @PostMapping
    @ResponseBody
    public Plant addPlant(JwtAccessToken creatorAccessToken,
                          @RequestBody AddPlantRequestBody plant) {
        return plantService.addPlant(plant, creatorAccessToken.getUserId());
    }

    @Operation(summary = "Changing Favourite flag in plant", security = @SecurityRequirement(name = JWT_AUTH))
    @PutMapping(path = "/{plantId}/toggle-favourite")
    @ResponseBody
    public void togglePlantFavourite(JwtAccessToken jwtAccessToken,
                                     @PathVariable int plantId) {
        plantService.changeFavourite(plantId, jwtAccessToken.getUserId());
    }


    @Operation(summary = "Update plant", security = @SecurityRequirement(name = JWT_AUTH))
    @PutMapping(path = "/{plantId}", consumes = "application/json")
    public Plant updatePlant(JwtAccessToken accessToken,
                             @RequestBody
                             AddPlantRequestBody addPlantRequestBody,
                             @PathVariable int plantId
    ) {
        return plantService.updatePlant(addPlantRequestBody, plantId,
                accessToken.getUserId());
    }

    @Operation(summary = "Delete plant by id", security = @SecurityRequirement(name = JWT_AUTH))
    @DeleteMapping(value = "/{id}")
    public void removePlant(JwtAccessToken accessToken, @PathVariable int id) {
        plantService.remove(id, accessToken.getUserId());
    }

    @Operation(summary = "Get all plants summary", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(value = "/summary")
    public List<PlantSummary> getAllPlantsSummary(JwtAccessToken accessToken) {
        return plantService.getPlantSummaries(accessToken.getUserId());
    }

    @Operation(summary = "Get plant stats", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(value = "/stats")
    public PlantsStats getPlantsStats(JwtAccessToken accessToken) {
        return plantService.getPlantsStats(accessToken.getUserId());
    }


    @Operation(summary = "Get plant photo", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(value = "/{id}/photo")
    public String getPlantPhoto(JwtAccessToken accessToken,
                                @PathVariable int id) {
        return plantService.getPhoto(id, accessToken.getUserId());
    }

    @Operation(summary = "Set plant photo", security = @SecurityRequirement(name = JWT_AUTH))
    @PostMapping(value = "/{id}/photo")
    @SecurityRequirement(name = "JWT")
    public Plant addPlantPhoto(JwtAccessToken accessToken, @PathVariable int id,
                               @RequestBody String base64String) {
        return plantService.setPhoto(id, accessToken.getUserId(), base64String);
    }
}
