package pl.edu.agh.awiteks_backend;

import org.springframework.context.annotation.Bean;
import pl.edu.agh.awiteks_backend.models.*;
import pl.edu.agh.awiteks_backend.repositories.Repository;
import pl.edu.agh.awiteks_backend.repositories.RepositoryImp;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@org.springframework.context.annotation.Configuration
public class MockConfiguration {

    @Bean
    public String getUrl() {
        return "https://netscroll.pl/wp-content/uploads/2021/10/CactusToy1.jpg";
    }

    @Bean
    public Species getMockSpecies() {
        return new Species(
                0,
                "Bean Specie",
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
    public Repository<Species> getSpeciesRepository(Species species) {
        Species species1 = new Species(1, "Kaktus", 20, Insolation.HIGH, 1, 1,
                7, Fertilization.LOW, -1);

        Species species2 = new Species(2, "Fiołek", 2, Insolation.HIGH, 1, 1,
                7, Fertilization.LOW, -1);

        Species species3 = new Species(3, "Storczyk", 3, Insolation.LOW, 2, 2,
                7, Fertilization.HIGH, -1);

        Species species4 = new Species(4, "Bazylia", 2, Insolation.MEDIUM, 4, 1,
                7, Fertilization.LOW, -1);

        Species species5 = new Species(5, "Mięta", 2, Insolation.LOW, 2, 2,
                7, Fertilization.LOW, -1);

        List<AbstractModel<Species>> speciesList = new ArrayList<>();
        speciesList.add(species);
        speciesList.add(species1);
        speciesList.add(species2);
        speciesList.add(species3);
        speciesList.add(species4);
        speciesList.add(species5);

        return new RepositoryImp<>(speciesList);
    }

    @Bean
    public Repository<User> getUserRepository(User user) {
        List<AbstractModel<User>> userList = new ArrayList<>();
        userList.add(user);
        return new RepositoryImp<>(userList);
    }

    @Bean
    public Repository<Plant> getPlantRepository(User user, Repository<Species> speciesRepository, Species species, String url) throws ParseException {
        //  public Activity(int id, Plant plant, ActivityType activityType, Date date)

        //  public Plant(int id, String name, User user, Species spiece, String note, Insolation actualInsolation)
        Plant plant1 = new Plant(0, "My Kaktus", user, speciesRepository.get(1).get(), "Simple Kaktus note", Insolation.HIGH, url);
        Activity activity1 = new Activity(0, plant1, ActivityType.FERTILISATION, "2022-05-22");
        Activity activity11 = new Activity(1, plant1, ActivityType.WATERING, "2022-05-28");
        Activity activity111 = new Activity(1, plant1, ActivityType.WATERING, "2022-05-04");

        Plant plant2 = new Plant(1, "My Fiołek", user, speciesRepository.get(2).get(), "Simple Fiołek note", Insolation.LOW, url);
        Activity activity2 = new Activity(2, plant2, ActivityType.FERTILISATION, "2022-04-22");
        Activity activity22 = new Activity(3, plant2, ActivityType.WATERING, "2000-12-13");

        Plant plant3 = new Plant(2, "My Storczyk", user, speciesRepository.get(3).get(), "Simple Storczyk note", Insolation.HIGH, url);
        Activity activity3 = new Activity(4, plant2, ActivityType.FERTILISATION, "2022-04-28");
        Activity activity33 = new Activity(5, plant2, ActivityType.WATERING, "2022-04-28");

        Plant plant4 = new Plant(3, "My Bazylia", user, speciesRepository.get(4).get(), "Simple Bazylia note", Insolation.HIGH, "eh");
        Activity activity4 = new Activity(6, plant2, ActivityType.FERTILISATION, "2022-04-28");
        Activity activity44 = new Activity(7, plant2, ActivityType.WATERING,"2022-04-29");

        Plant plant5 = new Plant(4, "My Mięta", user, speciesRepository.get(5).get(), "Simple Mięta note", Insolation.HIGH, true, url);
        Activity activity5 = new Activity(8, plant2, ActivityType.FERTILISATION, "2022-04-28");
        Activity activity55 = new Activity(9, plant2, ActivityType.WATERING, "2022-04-27");

        List<AbstractModel<Plant>> plantList = new ArrayList<>();
        plantList.add(plant1);
        plantList.add(plant2);
        plantList.add(plant3);
        plantList.add(plant4);
        plantList.add(plant5);

        plant1.addActivity(activity1);
        plant1.addActivity(activity11);
        plant1.addActivity(activity111);

        plant2.addActivity(activity2);
        plant2.addActivity(activity22);

        plant3.addActivity(activity3);
        plant3.addActivity(activity33);

        plant4.addActivity(activity4);
        plant4.addActivity(activity44);

        plant5.addActivity(activity5);
        plant5.addActivity(activity55);


        user.addPlant(plant1);
        user.addPlant(plant2);
        user.addPlant(plant3);
        user.addPlant(plant4);
        user.addPlant(plant5);

        return new RepositoryImp<>(plantList);
    }
}
