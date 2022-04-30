package pl.edu.agh.awiteks_backend.models;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<Plant> userPlants;

    public User(String name, @Lazy List<Plant> userPlants) {
        this.name = name;
        this.userPlants = userPlants;
    }

    public User(String name) {
        this(name, new ArrayList<>());
    }

    public User() {

    }

    public void addPlant(Plant plant) {
        userPlants.add(plant);
    }

    public void removePlant(Plant plant) {
        userPlants.remove(plant);
    }


    public List<Plant> getUserPlants() {
        return userPlants;
    }

    public void setUserPlants(List<Plant> userPlants) {
        this.userPlants = userPlants;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
