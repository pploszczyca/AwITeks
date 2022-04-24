package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.services.SpeciesService;

import java.util.List;
import java.util.Optional;

@RestController
public class SpeciesController {
    private final SpeciesService speciesService;

    @Autowired
    public SpeciesController(SpeciesService speciesService) {
        this.speciesService = speciesService;
    }

    @Operation(summary = "Get all species", operationId = "getAllSpecies")
    @GetMapping(value = "/species", produces = "application/json")
    public List<Species> getAllSpecies() {
        return speciesService.getAll();
    }

    @Operation(summary = "Get specific specie by id", operationId = "getSpecie")
    @GetMapping(value = "/species/{id}", produces = "application/json")
    public Optional<Species> getSpecie(@PathVariable int id) {
        return speciesService.get(id);
    }

    @Operation(summary = "Add new specie", operationId = "addSpecie")
    @PostMapping(path = "/species")
    @ResponseBody
    public void addSpecie(@RequestBody Species species) {
        speciesService.add(species);
    }

    @Operation(summary = "Update specie", operationId = "updateSpecie")
    @PutMapping(value = "/species", consumes = "application/json")
    public void updateSpecie(@RequestBody Species species) {
        speciesService.update(species);
    }

    @Operation(summary = "Delete specie by id", operationId = "removeSpecie")
    @DeleteMapping(value = "/species/{id}")
    public void remove(@PathVariable int id) {
        speciesService.remove(id);
    }
}
