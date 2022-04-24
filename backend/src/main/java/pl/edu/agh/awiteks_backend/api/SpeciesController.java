package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Species;
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

    @Operation(summary = "Get all species", operationId = "getAllSpecies")
    @GetMapping(produces = "application/json")
    public List<Species> getAllSpecies() {
        return speciesService.getAll();
    }

    @Operation(summary = "Get specific specie by id", operationId = "getSpecie")
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<Species> getSpecie(@PathVariable int id) {
        return speciesService.get(id);
    }

    @Operation(summary = "Add new specie", operationId = "addSpecie")
    @PostMapping()
    @ResponseBody
    public void addSpecie(@RequestBody Species species) {
        speciesService.add(species);
    }

    @Operation(summary = "Update specie", operationId = "updateSpecie")
    @PutMapping(consumes = "application/json")
    public void updateSpecie(@RequestBody Species species) {
        speciesService.update(species);
    }

    @Operation(summary = "Delete specie by id", operationId = "removeSpecie")
    @DeleteMapping(value = "/{id}")
    public void remove(@PathVariable int id) {
        speciesService.remove(id);
    }
}
