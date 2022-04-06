package agh.edu.pl.awiteks_backend.api;

import agh.edu.pl.awiteks_backend.models.Species;
import agh.edu.pl.awiteks_backend.repositories.species.SpeciesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class SpeciesController {
    private final SpeciesRepository speciesRepository;

    @Autowired
    public SpeciesController(SpeciesRepository speciesRepository) {
        this.speciesRepository = speciesRepository;
    }

    @GetMapping(value = "/species", produces = "application/json")
    public List<Species> getAllSpecies() {
        return speciesRepository.getAll();
    }

    @GetMapping(value = "/species/{id}", produces = "application/json")
    public Optional<Species> getSpecies(@PathVariable int id){
        return speciesRepository.get(id);
    }

    @PostMapping(path="/species")
    @ResponseBody
    public String addSpecies(@RequestBody Species species) {
        speciesRepository.add(species);
        return "ok";
    }

    @PutMapping(value = "/species", consumes = "application/json")
    public void updateSpecies(@RequestBody Species species) {
        speciesRepository.update(species);
    }

    @DeleteMapping(value = "/species/{id}")
    public void deleteSpecies(@PathVariable int id){
        speciesRepository.remove(id);
    }
}

