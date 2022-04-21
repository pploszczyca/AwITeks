package pl.edu.agh.awiteks_backend;

import pl.edu.agh.awiteks_backend.models.*;
import pl.edu.agh.awiteks_backend.repositories.Repository;
import pl.edu.agh.awiteks_backend.repositories.RepositoryImp;
import org.springframework.context.annotation.Bean;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;

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
    public Repository<Species> getSpeciesRepository(Species species, Repository<Plant> plantRepository) {
        List<AbstractModel<Species>> speciesList = new ArrayList<>();
        speciesList.add(species);

        return new SpeciesRepository(speciesList, plantRepository);
    }

    @Bean
    public Repository<User> getUserRepository(Repository<Species> speciesRepository, Repository<Plant> plantRepository, User user) {
        List<AbstractModel<User>> userList = new ArrayList<>();
        userList.add(user);
        return new UserRepository(userList, speciesRepository, plantRepository);
    }

    @Bean
    public Repository<Plant> getPlantRepository(Plant plant) {
        List<Plant> plantList = new ArrayList<>();
        plantList.add(plant);

        return new RepositoryImp(plantList);
    }
}
