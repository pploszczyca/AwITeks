package pl.edu.agh.awiteks_backend.api.activities;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.services.ActivityService;

import java.util.List;

import static pl.edu.agh.awiteks_backend.configs.SwaggerConfig.JWT_AUTH;

@RestController
@RequestMapping("/activity")
public class ActivityController {
    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @Operation(summary = "Add new activity to plant", security = @SecurityRequirement(name = JWT_AUTH))
    @PostMapping("/{plantID}")
    public void addActivity(@RequestBody Activity activity, @PathVariable int plantID) {
        // TODO validate ownership
        activityService.add(activity, plantID);
    }

    @Operation(summary = "Delete activity", security = @SecurityRequirement(name = JWT_AUTH))
    @DeleteMapping("/{plantId}/{activityId}")
    public void removeActivity(@PathVariable int plantId, @PathVariable int activityId) {
        // TODO validate ownership
        activityService.remove(plantId, activityId);
    }

}
