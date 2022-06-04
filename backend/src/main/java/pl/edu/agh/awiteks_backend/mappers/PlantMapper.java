package pl.edu.agh.awiteks_backend.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import pl.edu.agh.awiteks_backend.api.plants.body_models.AddPlantRequestBody;
import pl.edu.agh.awiteks_backend.api.plants.body_models.PlantSummary;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.repositories.SpeciesRepository;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;

@Mapper(componentModel = "spring")
public abstract class PlantMapper {

    @Autowired
    protected SpeciesRepository speciesRepository;

    @Autowired
    protected UserRepository userRepository;

    @Mapping(target = "speciesName", source = "plant.species.name")
    @Mapping(target = "isFavourite", expression = "java(plant.isFavourite())")
    public abstract PlantSummary plantToSummary(Plant plant);

    @Mapping(target = "favourite", expression = "java(false)")
    @Mapping(target = "species", expression = "java(speciesRepository.findByIdAndCreatorId(addPlantRequestBody.speciesId(), userId).orElseThrow())")
    @Mapping(target = "user", expression = "java(userRepository.findById(userId).orElseThrow())")
    public abstract Plant requestBodyToPlant(
            AddPlantRequestBody addPlantRequestBody, int userId,
            List<Activity> plantActivities);
}
