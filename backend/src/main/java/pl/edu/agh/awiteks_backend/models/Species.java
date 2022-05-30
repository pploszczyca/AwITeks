package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "species")
@JsonIgnoreProperties({"plantList"})
@Getter
@Setter
@NoArgsConstructor
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

    public Species(String name, int maxAge, Insolation neededInsolation,
                   int waterDose,
                   int waterRoutine, int fertilizationRoutine,
                   Fertilization fertilizationDose, int creatorID,
                   List<Plant> plantList) {
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
}
