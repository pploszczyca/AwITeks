package pl.edu.agh.awiteks_backend.mappers;

import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.PlantSummary;

public class PlantMapper {
    public static PlantSummary plantToPlantSummary(Plant plant){
        return PlantSummary.builder().id(plant.getId()).name(plant.getName()).speciesName(plant.getSpiece().getName()).imgUrl(plant.getUrl()).build();
    }
}