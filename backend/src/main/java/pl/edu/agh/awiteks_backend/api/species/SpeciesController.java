package pl.edu.agh.awiteks_backend.api.species;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.services.SpeciesService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/species")
public class SpeciesController {
    private final SpeciesService speciesService;

    @Autowired
    public SpeciesController(SpeciesService speciesService) {
        this.speciesService = speciesService;
    }

    @Operation(summary = "Get all species")
    @GetMapping(produces = "application/json")
    public List<Species> getAllSpecies(JwtAccessToken accessToken) {
        // TODO validate ownership
        return speciesService.getAll();
    }

    @Operation(summary = "Get specific specie by id")
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<Species> getSpecies(@PathVariable int id) {
        // TODO validate ownership
        return speciesService.get(id);
    }

    @Operation(summary = "Add new species")
    @PostMapping
    @ResponseBody
    public Species addSpecies(JwtAccessToken creatorAccessToken, @RequestBody AddSpeciesRequestBody species) {
        return speciesService.addSpecies(species, creatorAccessToken.getUserId());
    }

    @Operation(summary = "Update specie")
    @PutMapping(consumes = "application/json")
    public void updateSpecies(@RequestBody Species species) {
        // TODO validate ownership
        speciesService.update(species);
    }

    @Operation(summary = "Delete specie by id")
    @DeleteMapping(value = "/{id}")
    public void removeSpecies(@PathVariable int id) {
        // TODO validate ownership
        speciesService.remove(id);
    }
}
