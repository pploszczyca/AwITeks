package pl.edu.agh.awiteks_backend.api;

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
    @GetMapping(value = "/users", produces = "application/json")
    public List getAll() {
        return super.getAll();
    }

    @Override
    @GetMapping(value = "/users/{id}", produces = "application/json")
    public Optional get(@PathVariable int id) {
        return super.get(id);
    }

    @Override
    @PostMapping(path = "/users")
    @ResponseBody
    public String add(@RequestBody User user) {
        return super.add(user);
    }

    @Override
    @PutMapping(value = "/users", consumes = "application/json")
    public void update(@RequestBody User user) {
        super.update(user);
    }

    @Override
    @DeleteMapping(value = "/users/{id}")
    public void remove(@PathVariable int id) {
        super.remove(id);
    }
}
