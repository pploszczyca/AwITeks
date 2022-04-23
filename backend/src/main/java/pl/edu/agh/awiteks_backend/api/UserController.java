package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.Repository;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController extends ModelController<User> {
    @Autowired
    public UserController(Repository<User> userRepository) {
        super(userRepository);
    }

    @Override
    @Operation(summary = "Get all users", operationId = "getAllUsers")
    @GetMapping(value = "/users", produces = "application/json")
    public List getAll() {
        return super.getAll();
    }

    @Override
    @Operation(summary = "Get user by id", operationId = "getUser")
    @GetMapping(value = "/users/{id}", produces = "application/json")
    public Optional get(@PathVariable int id) {
        return super.get(id);
    }

    @Override
    @Operation(summary = "Add new user", operationId = "addUser")
    @PostMapping(path = "/users")
    @ResponseBody
    public String add(@RequestBody User user) {
        return super.add(user);
    }

    @Override
    @Operation(summary = "Update user", operationId = "updateUser")
    @PutMapping(value = "/users", consumes = "application/json")
    public void update(@RequestBody User user) {
        super.update(user);
    }

    @Override
    @Operation(summary = "Delete user by id", operationId = "removeUser")
    @DeleteMapping(value = "/users/{id}")
    public void remove(@PathVariable int id) {
        super.remove(id);
    }
}
