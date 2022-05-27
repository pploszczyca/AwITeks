package pl.edu.agh.awiteks_backend.api.activities;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.awiteks_backend.api.activities.body_models.AddActivityRequestBody;
import static pl.edu.agh.awiteks_backend.configs.SwaggerConfig.JWT_AUTH;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.services.ActivityService;

@RestController
@RequestMapping("/activity")
public class ActivityController {
    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @Operation(summary = "Add new activity to plant", security = @SecurityRequirement(name = JWT_AUTH))
    @PostMapping
    public void addActivity(JwtAccessToken jwtAccessToken,
                            @RequestBody AddActivityRequestBody activity) {
        activityService.addActivity(activity, jwtAccessToken.getUserId());
    }

    @Operation(summary = "Delete activity", security = @SecurityRequirement(name = JWT_AUTH))
    @DeleteMapping("/{plantId}/{activityId}")
    public void removeActivity(JwtAccessToken jwtAccessToken,
                               @PathVariable int plantId,
                               @PathVariable int activityId) {
        activityService.remove(plantId, activityId, jwtAccessToken.getUserId());
    }

    @Operation(summary = "Get all user's activities for given year and month, plus all overdue activities", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping
    public List<Activity> getActivities(JwtAccessToken jwtAccessToken,
                                        @RequestParam int year,
                                        @RequestParam int month) {
        return activityService.getUsersActivities(jwtAccessToken.getUserId(),
                year, month);
    }

}
