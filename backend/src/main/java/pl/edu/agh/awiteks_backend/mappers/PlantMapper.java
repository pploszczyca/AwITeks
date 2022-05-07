package pl.edu.agh.awiteks_backend.mappers;

import pl.edu.agh.awiteks_backend.api.plants.PlantSummary;
import pl.edu.agh.awiteks_backend.models.Plant;

public class PlantMapper {
    public static PlantSummary plantToPlantSummary(Plant plant) {
        return new PlantSummary(
                plant.getId(),
                plant.getName(),
                plant.getSpecies().getName(),
                plant.isFavourite(),
                plant.getUrl()
        );
    }
}