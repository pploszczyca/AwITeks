package pl.edu.agh.awiteks_backend.utilities;

import org.springframework.stereotype.Component;
import pl.edu.agh.awiteks_backend.api.plants.body_models.AddPlantRequestBody;

@Component
public class PlantValidator {
    public void validateNewPlantRequest(AddPlantRequestBody plant) {
        if (DateValidationUtilities.isInTheFuture(
                plant.lastFertilizationDate()) ||
                DateValidationUtilities.isInTheFuture(
                        plant.lastWateringDate())) {
            throw new IllegalArgumentException(
                    "Last activity dates can't be in the future " + plant);
        }
    }
}
