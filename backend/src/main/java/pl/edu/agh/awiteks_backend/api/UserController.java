package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.mappers.PlantMapper;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.PlantSummary;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.Repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class UserController extends ModelController<User> {
    @Autowired
    public UserController(Repository<User> userRepository) {
        super(userRepository);
    }

    @Override
    @Operation(summary = "Get all users")
    @GetMapping(value = "/users", produces = "application/json")
    public List getAll() {
        return super.getAll();
    }

    @Override
    @Operation(summary = "Get user by id")
    @GetMapping(value = "/users/{id}", produces = "application/json")
    public Optional get(@PathVariable int id) {
        return super.get(id);
    }

    @Override
    @Operation(summary = "Add new user")
    @PostMapping(path = "/users")
    @ResponseBody
    public String add(@RequestBody User user) {
        return super.add(user);
    }

    @Override
    @Operation(summary = "Update user")
    @PutMapping(value = "/users", consumes = "application/json")
    public void update(@RequestBody User user) {
        super.update(user);
    }

    @Override
    @Operation(summary = "Delete user by id")
    @DeleteMapping(value = "/users/{id}")
    public void remove(@PathVariable int id) {
        super.remove(id);
    }

    @Operation(summary = "Get all plants summary")
    @GetMapping(value="/user/{id}/plants")
    public List getAllPlantsSummary(@PathVariable int id){
        Optional<User> user =  this.get(id);
        return user.<List>map(value -> value
                .getUserPlants()
                .stream()
                .map(PlantMapper::plantToPlantSummary)
                .collect(Collectors.toList())).orElseGet(() -> Collections.singletonList(PlantSummary.builder().id(-1).name("luka").speciesName("luka").speciesName("luka").isFavourite(false).imgUrl("https://tatamariusz.pl/hans-christian-andersen-polny-kwiatek/#iLightbox[gallery3623]/0").build()));
    }
}
