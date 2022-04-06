package agh.edu.pl.awiteks_backend.api;

import agh.edu.pl.awiteks_backend.models.Plant;
import agh.edu.pl.awiteks_backend.models.User;
import agh.edu.pl.awiteks_backend.repositories.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PlantController extends ModelController<Plant> {
    private final Repository<User> userRepository;

    @Autowired
    public PlantController(Repository<Plant> modelRepository, Repository<User> userRepository) {
        super(modelRepository);
        this.userRepository = userRepository;
    }

    @Override
    @GetMapping(value = "/plants", produces = "application/json")
    public List<Plant> getAll() {
        return super.getAll();
    }

    @Override
    @GetMapping(value = "/plants/{id}", produces = "application/json")
    public Optional<Plant> get(@PathVariable int id) {
        return super.get(id);
    }

    @PostMapping(path = "/plants/{userId}")
    @ResponseBody
    public String add(@RequestBody Plant plant, @PathVariable int userId) {
        Optional<User> user = userRepository.get(userId);
        user.ifPresent(user1 -> {
            user1.addPlant(plant);
            plant.setUser(user1);
        });
        return super.add(plant);
    }

    @Override
    @PutMapping(value = "/plants", consumes = "application/json")
    public void update(@RequestBody Plant plant) {
        super.update(plant);
    }

    @Override
    @DeleteMapping(value = "/plants/{id}")
    public void deleteSpecies(@PathVariable int id) {
        super.deleteSpecies(id);
    }
}
