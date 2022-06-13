package pl.edu.agh.awiteks_backend.api.species;

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
import pl.edu.agh.awiteks_backend.api.species.body_models.AddSpeciesRequestBody;
import static pl.edu.agh.awiteks_backend.configs.SwaggerConfig.JWT_AUTH;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.services.SpeciesService;

@RestController
@RequestMapping("/species")
@RequiredArgsConstructor
public class SpeciesController {
    private final SpeciesService speciesService;

    @Operation(summary = "Get all species", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(produces = "application/json")
    public List<Species> getAllSpecies(JwtAccessToken jwtAccessToken) {
        return speciesService.getAll(jwtAccessToken.getUserId());
    }

    @Operation(summary = "Get specific specie by id", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<Species> getSpecies(JwtAccessToken jwtAccessToken,
                                        @PathVariable int id) {
        return speciesService.get(id, jwtAccessToken.getUserId());
    }

    @Operation(summary = "Add new species", security = @SecurityRequirement(name = JWT_AUTH))
    @PostMapping
    @ResponseBody
    public Species addSpecies(JwtAccessToken creatorAccessToken,
                              @RequestBody AddSpeciesRequestBody species) {
        return speciesService.addSpecies(species,
                creatorAccessToken.getUserId());
    }

    @Operation(summary = "Update specie", security = @SecurityRequirement(name = JWT_AUTH))
    @PutMapping(consumes = "application/json")
    public void updateSpecies(JwtAccessToken jwtAccessToken,
                              @RequestBody Species species) {
        speciesService.update(species, jwtAccessToken.getUserId());
    }

    @Operation(summary = "Delete specie by id", security = @SecurityRequirement(name = JWT_AUTH))
    @DeleteMapping(value = "/{id}")
    public void removeSpecies(JwtAccessToken jwtAccessToken,
                              @PathVariable int id) {
        speciesService.remove(id, jwtAccessToken.getUserId());
    }
}
