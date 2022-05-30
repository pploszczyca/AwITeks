package pl.edu.agh.awiteks_backend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.activities.body_models.AddActivityRequestBody;
import pl.edu.agh.awiteks_backend.mappers.ActivityMapper;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.repositories.ActivityRepository;
import pl.edu.agh.awiteks_backend.repositories.PlantRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;

@Service
public class ActivityService extends ModelService<Activity> {
    private final PlantRepository plantRepository;

    private final ActivityRepository activityRepository;

    private final ActivityMapper activityMapper;

    @Autowired
    public ActivityService(ActivityRepository activityRepository,
                           PlantRepository plantRepository,
                           ListUtilities listUtilities,
                           ActivityMapper activityMapper) {
        super(activityRepository, listUtilities);
        this.activityRepository = activityRepository;
        this.plantRepository = plantRepository;
        this.activityMapper = activityMapper;
    }

    public void addActivity(AddActivityRequestBody activityRequestBody,
                            int userId) {
        plantRepository
                .findByIdAndUserId(activityRequestBody.plantId(), userId)
                .ifPresent(presentPlant -> {
                    final Activity activity =
                            activityMapper.requestBodyToActivity(
                                    activityRequestBody, presentPlant);

                    presentPlant.addActivity(activity);
                    plantRepository.save(presentPlant);
                });
    }

    public void remove(int plantId, int activityId, int userId) {
        this.remove(activityId);
        plantRepository
                .findByIdAndUserId(plantId, userId)
                .ifPresent(plant -> plant.removeActivity(activityId));
    }

    public List<Activity> getUsersActivities(int userId, int year, int month) {
        return activityRepository.getDisplayableActivities(userId, year, month);
    }
}
