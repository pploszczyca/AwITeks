package pl.edu.agh.awiteks_backend.models;

import lombok.Builder;

@Builder
public class PlantSummary {
    private Integer id;
    private String name;
    private String speciesName;
    private Boolean isFavourite;
    private String imgUrl;
}
