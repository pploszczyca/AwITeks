package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.services.UserService;

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
}
