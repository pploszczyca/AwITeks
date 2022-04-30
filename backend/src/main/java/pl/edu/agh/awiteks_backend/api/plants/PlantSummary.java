package pl.edu.agh.awiteks_backend.api.plants;

public class PlantSummary {
    private final Integer id;
    private final String name;
    private final String speciesName;
    private final Boolean isFavourite;
    private final String imgUrl;

    public PlantSummary(Integer id, String name, String speciesName, Boolean isFavourite, String imgUrl) {
        this.id = id;
        this.name = name;
        this.speciesName = speciesName;
        this.isFavourite = isFavourite;
        this.imgUrl = imgUrl;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSpeciesName() {
        return speciesName;
    }

    public Boolean getFavourite() {
        return isFavourite;
    }

    public String getImgUrl() {
        return imgUrl;
    }
}
