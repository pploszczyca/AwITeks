package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.repositories.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class SpeciesController extends ModelController<Species> {

    @Autowired
    public SpeciesController(Repository<Species> speciesRepository) {
        super(speciesRepository);
    }

    @Override
    @Operation(summary = "Get all species")
    @GetMapping(value = "/species", produces = "application/json")
    public List getAll() {
        return super.getAll();
    }

    @Override
    @Operation(summary = "Get specific specie by id")
    @GetMapping(value = "/species/{id}", produces = "application/json")
    public Optional get(@PathVariable int id) {
        return super.get(id);
    }

    @Override
    @Operation(summary = "Add new specie")
    @PostMapping(path = "/species")
    @ResponseBody
    public String add(@RequestBody Species species) {
        return super.add(species);
    }

    @Override
    @Operation(summary = "Update specie")
    @PutMapping(value = "/species", consumes = "application/json")
    public void update(@RequestBody Species species) {
        super.update(species);
    }

    @Override
    @Operation(summary = "Delete specie by id")
    @DeleteMapping(value = "/species/{id}")
    public void remove(@PathVariable int id) {
        super.remove(id);
    }
}
