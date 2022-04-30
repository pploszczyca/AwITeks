package pl.edu.agh.awiteks_backend.api;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.services.ActivityService;

@RestController
@RequestMapping("/activity")
public class ActivityController {
    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @Operation(summary = "Add new activity to plant", operationId = "addActivity")
    @PostMapping("/{plantID}")
    public void addActivity(@RequestBody Activity activity, @PathVariable int plantID) {
        activityService.add(activity, plantID);
    }

    @Operation(summary = "Delete activity", operationId = "removeActivity")
    @DeleteMapping("/{plantId}/{activityId}")
    public void removeActivity(@PathVariable int plantId, @PathVariable int activityId) {
        activityService.remove(plantId, activityId);
    }

}
