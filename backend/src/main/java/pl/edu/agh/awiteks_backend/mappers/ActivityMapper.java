package pl.edu.agh.awiteks_backend.mappers;

import org.mapstruct.Mapper;
import pl.edu.agh.awiteks_backend.api.activities.body_models.AddActivityRequestBody;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.models.Plant;

@Mapper(componentModel = "spring")
public interface ActivityMapper {
    Activity requestBodyToActivity(
            AddActivityRequestBody addActivityRequestBody, Plant plant);
}
