package agh.edu.pl.awiteks_backend;

import agh.edu.pl.awiteks_backend.models.Fertilization;
import agh.edu.pl.awiteks_backend.models.Insolation;
import agh.edu.pl.awiteks_backend.models.Species;
import agh.edu.pl.awiteks_backend.repositories.species.SpeciesRepository;
import agh.edu.pl.awiteks_backend.repositories.species.SpeciesRepositoryImp;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@org.springframework.context.annotation.Configuration
public class Configuration {

    @Bean
    public SpeciesRepository getSpeciesRepository() {
        List<Species> speciesList = new ArrayList<>();
        speciesList.add(new Species(
                0,
                "Gatunek",
                2,
                Insolation.LOW,
                1,
                1,
                2,
                Fertilization.LOW
        ));

        return new SpeciesRepositoryImp(speciesList);
    }

}


