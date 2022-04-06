package pl.edu.agh.awiteks_backend.api;

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
    @GetMapping(value = "/species", produces = "application/json")
    public List getAll() {
        return super.getAll();
    }

    @Override
    @GetMapping(value = "/species/{id}", produces = "application/json")
    public Optional get(@PathVariable int id) {
        return super.get(id);
    }

    @Override
    @PostMapping(path = "/species")
    @ResponseBody
    public String add(@RequestBody Species species) {
        return super.add(species);
    }

    @Override
    @PutMapping(value = "/species", consumes = "application/json")
    public void update(@RequestBody Species species) {
        super.update(species);
    }

    @Override
    @DeleteMapping(value = "/species/{id}")
    public void deleteSpecies(@PathVariable int id) {
        super.deleteSpecies(id);
    }
}
