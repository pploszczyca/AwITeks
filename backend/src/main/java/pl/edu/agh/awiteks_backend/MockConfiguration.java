package pl.edu.agh.awiteks_backend;

import pl.edu.agh.awiteks_backend.models.*;
import pl.edu.agh.awiteks_backend.repositories.Repository;
import pl.edu.agh.awiteks_backend.repositories.RepositoryImp;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@org.springframework.context.annotation.Configuration
public class MockConfiguration {

    @Bean
    public Species getMockSpecies() {
        return new Species(
                0,
                "Gatunek",
                2,
                Insolation.LOW,
                1,
                1,
                2,
                Fertilization.LOW
        );
    }

    @Bean
    public User getMocUser() {
        return new User(
                0,
                "Jan Kowalski"
        );
    }

    @Bean
    public Plant getMockPlant(User user, Species species) {
        return new Plant(
                1,
                "Kaktusiatko",
                user,
                species,
                " ",
                Insolation.HIGH
        );
    }

    @Bean
    public Repository<Species> getSpeciesRepository(Species species) {
        List<Species> speciesList = new ArrayList<>();
        speciesList.add(species);

        return new RepositoryImp(speciesList);
    }

    @Bean
    public Repository<User> getUserRepository(User user) {
        List<User> userList = new ArrayList<>();
        userList.add(user);
        return new RepositoryImp(userList);
    }

    @Bean
    public Repository<Plant> getPlantRepository(Plant plant) {
        List<Plant> plantList = new ArrayList<>();
        plantList.add(plant);

        return new RepositoryImp(plantList);
    }
}


