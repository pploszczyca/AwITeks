package pl.edu.agh.awiteks_backend.models;

import java.util.ArrayList;
import java.util.List;

public class User extends AbstractModel<User> {
    private List<Plant> userPlants;

    public User(int id, String name, List<Plant> userPlants) {
        super(id, name);
        this.userPlants = userPlants;
    }

    public User(int id, String name) {
        this(id, name, new ArrayList<>());
    }

    public User() {

    }

    public void addPlant(Plant plant) {
        userPlants.add(plant);
    }

    public void removePlant(Plant plant) {
        userPlants.remove(plant);
    }

    public void editPlant(Plant plant) {
        int index = userPlants.indexOf(plant);
        userPlants.set(index, plant);
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }


    @Override
    public User copy() {
        List<Plant> list = this.userPlants.stream().map(AbstractModel::copy).toList();
        return new User(
                id,
                name,
                list);
    }

    public List<Plant> getUserPlants() {
        return userPlants;
    }

    public void setUserPlants(List<Plant> userPlants) {
        this.userPlants = userPlants;
    }
}
