package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.repositories.Repository;


@Service
public class ActivityService {
    private final Repository<Plant> plantRepository;

    @Autowired
    public ActivityService(Repository<Plant> plantRepository) {
        this.plantRepository = plantRepository;
    }

    public void add(Activity activity, int plantId) {
        plantRepository
                .get(plantId)
                .ifPresent(presentPlant -> presentPlant.addActivity(activity));
    }

    public void remove(int plantId, int activityId) {
        plantRepository
                .get(plantId)
                .ifPresent(plant -> plant.removeActivity(activityId));
    }
}
