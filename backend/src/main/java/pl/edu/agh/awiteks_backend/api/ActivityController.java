package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.services.ActivityService;

@RestController
public class ActivityController {
    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @Operation(summary = "Add new activity to plant", operationId = "addActivity")
    @PostMapping("/activity/{plantID}")
    public void add(@RequestBody Activity activity, @PathVariable int plantID) {
        activityService.add(activity, plantID);
    }

    @Operation(summary = "Delete activity", operationId = "removeActivity")
    @DeleteMapping("/activity/{plantId}/{activityId}")
    public void remove(@PathVariable int plantId, @PathVariable int activityId) {
        activityService.remove(plantId, activityId);
    }

}
