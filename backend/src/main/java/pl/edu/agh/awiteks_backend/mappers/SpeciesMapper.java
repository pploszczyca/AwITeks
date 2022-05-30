package pl.edu.agh.awiteks_backend.mappers;

import org.mapstruct.Mapper;
import pl.edu.agh.awiteks_backend.api.species.body_models.AddSpeciesRequestBody;
import pl.edu.agh.awiteks_backend.models.Species;

@Mapper(componentModel = "spring")
public interface SpeciesMapper {
    Species fromAddRequestBodyToSpecies(AddSpeciesRequestBody addSpeciesRequestBody);
}
