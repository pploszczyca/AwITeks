package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.Species;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Optional;

@RestController
public class PlantController extends ModelController<Plant> {
    private final Repository<User> userRepository;
    private final Repository<Species> speciesRepository;

    @Autowired
    public PlantController(Repository<Plant> modelRepository, Repository<User> userRepository, Repository<Species> speciesRepository) {
        super(modelRepository);
        this.userRepository = userRepository;
        this.speciesRepository = speciesRepository;
    }

    @Override
    @Operation(summary = "Get all plants")
    @GetMapping(value = "/plants", produces = "application/json")
    public List<Plant> getAll() {
        return super.getAll();
    }

    @Override
    @Operation(summary = "Get plant by id")
    @GetMapping(value = "/plants/{id}", produces = "application/json")
    public Optional<Plant> get(@PathVariable int id) {
        return super.get(id);
    }

    @Operation(summary = "Add new plant, assign it to specifier user and specie")
    @PostMapping(path = "/plants/{userId}/{speciesId}")
    @ResponseBody
    public String add(@RequestBody Plant plant, @PathVariable int userId, @PathVariable int speciesId) {
        this.speciesRepository.get(speciesId).ifPresent(plant::setSpecies);
        addPlantToUserList(plant, userId);
        return super.add(plant);
    }


    @Operation(summary = "Get photo URL of plant")
    @GetMapping(path = "/plants/{id}/URL")
    public String getURL(@PathVariable int id){
        Optional<Plant> plantOptional = super.get(id);
        if(plantOptional.isPresent()){
            return plantOptional.get().getPictureURL();
        }else{
            return "https://tatamariusz.pl/hans-christian-andersen-polny-kwiatek/#iLightbox[gallery3623]/0";
        }
    }

    @Override
    @Operation(summary = "Update plant")
    @PutMapping(value = "/plants", consumes = "application/json")
    public void update(@RequestBody Plant plant) {
        super.update(plant);
    }

    @Override
    @Operation(summary = "Delete plant by id")
    @DeleteMapping(value = "/plants/{id}")
    public void remove(@PathVariable int id) {
        removePlantFromUserList(id);
        super.remove(id);
    }

    private void removePlantFromUserList(int id) {
        Optional<Plant> plant = super.get(id);
        plant.ifPresent(presentPlant -> {
            User user = presentPlant.getUser();
            user.removePlant(presentPlant);
        });
    }

    private void addPlantToUserList(Plant plant, int userId) {
        Optional<User> user = userRepository.get(userId);
        user.ifPresent(presentUser -> {
            presentUser.addPlant(plant);
            plant.setUser(presentUser);
        });
    }
}
