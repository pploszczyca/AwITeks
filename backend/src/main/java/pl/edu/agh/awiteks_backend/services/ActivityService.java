package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.repositories.ActivityRepository;
import pl.edu.agh.awiteks_backend.repositories.PlantRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;

@Service
public class ActivityService extends ModelService<Activity> {
    private final PlantRepository plantRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository,
                           PlantRepository plantRepository,
                           ListUtilities listUtilities
    ) {
        super(activityRepository, listUtilities);
        this.plantRepository = plantRepository;
    }

    public void add(Activity activity, int plantId, int userId) {
        plantRepository
                .findByIdAndUserId(plantId, userId)
                .ifPresent(presentPlant -> {
                    presentPlant.addActivity(activity);
                    activity.setPlant(presentPlant);
                    plantRepository.save(presentPlant);
                });
    }

    public void remove(int plantId, int activityId, int userId) {
        this.remove(activityId);
        plantRepository
                .findByIdAndUserId(plantId, userId)
                .ifPresent(plant -> plant.removeActivity(activityId));
    }
}
