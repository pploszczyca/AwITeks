package pl.edu.agh.awiteks_backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.awiteks_backend.api.activities.body_models.AddActivityRequestBody;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.models.Plant;

@Mapper(componentModel = "spring")
public interface ActivityMapper {
    @Mapping(target = "id", expression = "java(null)")
    Activity requestBodyToActivity(
            AddActivityRequestBody addActivityRequestBody, Plant plant);
}
