package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "species")
@JsonIgnoreProperties({"plantList"})
public class Species {
    public static final int NO_CREATOR = -1;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(required = true)
    private Integer id;

    @Schema(required = true)
    private String name;

    @Schema(required = true)
    private int maxAge;

    @Schema(required = true)
    private Insolation neededInsolation;

    @Schema(required = true)
    private int waterDose;

    @Schema(required = true)
    private int waterRoutine;

    @Schema(required = true)
    private int fertilizationRoutine;

    @Schema(required = true)
    private Fertilization fertilizationDose;

    @Schema(required = true)
    private int creatorId;

    @OneToMany(mappedBy = "species", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<Plant> plantList;

    public Species(String name, int maxAge, Insolation neededInsolation, int waterDose,
                   int waterRoutine, int fertilizationRoutine, Fertilization fertilizationDose, int creatorID, List<Plant> plantList) {
        this.name = name;
        this.maxAge = maxAge;
        this.neededInsolation = neededInsolation;
        this.waterDose = waterDose;
        this.waterRoutine = waterRoutine;
        this.fertilizationRoutine = fertilizationRoutine;
        this.fertilizationDose = fertilizationDose;
        this.creatorId = creatorID;
        this.plantList = plantList;
    }

    public Species() {
    }

    public int getMaxAge() {
        return maxAge;
    }

    public Insolation getNeededInsolation() {
        return neededInsolation;
    }

    public int getWaterDose() {
        return waterDose;
    }

    public int getWaterRoutine() {
        return waterRoutine;
    }

    public int getFertilizationRoutine() {
        return fertilizationRoutine;
    }

    public Fertilization getFertilizationDose() {
        return fertilizationDose;
    }

    public void setMaxAge(int maxAge) {
        this.maxAge = maxAge;
    }

    public void setNeededInsolation(Insolation neededInsolation) {
        this.neededInsolation = neededInsolation;
    }

    public void setWaterDose(int waterDose) {
        this.waterDose = waterDose;
    }

    public void setWaterRoutine(int waterRoutine) {
        this.waterRoutine = waterRoutine;
    }

    public void setFertilizationRoutine(int fertilizationRoutine) {
        this.fertilizationRoutine = fertilizationRoutine;
    }

    public void setFertilizationDose(Fertilization fertilizationDose) {
        this.fertilizationDose = fertilizationDose;
    }

    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorId) {
        this.creatorId = creatorId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Plant> getPlantList() {
        return plantList;
    }

    public void setPlantList(List<Plant> plantList) {
        this.plantList = plantList;
    }
}
