package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.services.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Get all users", operationId = "getAllUsers")
    @GetMapping(produces = "application/json")
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    @Operation(summary = "Get user by id", operationId = "getUser")
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<User> getUser(@PathVariable int id) {
        return userService.get(id);
    }

    @Operation(summary = "Add new user", operationId = "addUser")
    @PostMapping()
    public void addUser(@RequestBody User user) {
        userService.add(user);
    }

    @Operation(summary = "Update user", operationId = "updateUser")
    @PutMapping(consumes = "application/json")
    public void updateUser(@RequestBody User user) {
        userService.update(user);
    }

    @Operation(summary = "Delete user by id", operationId = "removeUser")
    @DeleteMapping(value = "/{id}")
    public void removeUser(@PathVariable int id) {
        userService.remove(id);
    }

    @Operation(summary = "Get all user plants", operationId = "getUserPlants")
    @GetMapping(value = "/users/{id}/plants", produces = "application/json")
    public List<Plant> getPlants(@PathVariable int id) {
        var user = userService.get(id);
        if(user.isPresent())
            return user.get().getUserPlants();
        else
            return new ArrayList<Plant>();
    }

    @Operation(summary = "Get all favourite user plants", operationId = "getFavouriteUserPlants")
    @GetMapping(value = "/users/{id}/favPlants", produces = "application/json")
    public List<Plant> getFavPlants(@PathVariable int id) {
        var user = userService.get(id);
        if(user.isPresent())
            return user.get().getUserPlants().stream().filter(Plant::isFavourite).toList();
        else
            return new ArrayList<Plant>();
    }

}
