package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import javax.persistence.*;
import java.sql.Blob;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "plants")
@JsonIgnoreProperties({"user", "plantActivities"})
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(required = true)
    private Integer id;

    @Schema(required = true)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @Schema(required = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "species_id", nullable = false)
    @Schema(required = true)
    private Species species;

    private String note;

    @Schema(required = true)
    private Insolation actualInsolation;

    @OneToMany(mappedBy = "plant", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<Activity> plantActivities = new ArrayList<>();

    @Schema(required = true)
    private boolean favourite;

    @Schema(required = true)
    @Lob
    private String photo;

    public Plant(String name, User user, Species species, String note, Insolation actualInsolation, List<Activity> plantActivities, boolean favourite, String photo) {
        this.name = name;
        this.user = user;
        this.species = species;
        this.note = note;
        this.actualInsolation = actualInsolation;
        this.plantActivities = plantActivities;
        this.favourite = favourite;
        this.photo = photo;
    }

    public Plant(String name, User user, Species species, String note, Insolation actualInsolation, boolean favourite, String photo) {
        this(name, user, species, note, actualInsolation, new ArrayList<>(), favourite, photo);
    }

    public Plant() {
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public User getUser() {
        return user;
    }

    public Species getSpecies() {
        return species;
    }

    public Insolation getActualInsolation() {
        return actualInsolation;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setSpecies(Species spiece) {
        this.species = spiece;
    }

    public void setActualInsolation(Insolation actualInsolation) {
        this.actualInsolation = actualInsolation;
    }

    public List<Activity> getPlantActivities() {
        return plantActivities;
    }

    public void setPlantActivities(List<Activity> plantActivities) {
        this.plantActivities = plantActivities;
    }

    public void addActivity(Activity activity) {
        plantActivities.add(activity);
        activity.setPlant(this);
    }

    public boolean isFavourite() {
        return favourite;
    }

    public void setFavourite(boolean favourite) {
        this.favourite = favourite;
    }

    public void removeActivity(Activity activity) {
        plantActivities.remove(activity);
    }

    public void removeActivity(int activityId) {
        plantActivities
                .stream()
                .filter(activity -> activity.getId() == activityId)
                .findFirst()
                .ifPresent(this::removeActivity);
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
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

    @JsonProperty
    @Schema(required = true)
    public String getLastWateringDate() {
        return getLastActivityDate(ActivityType.WATERING);
    }

    @JsonProperty
    @Schema(required = true)
    public String getLastFertilizationDate() {
        return getLastActivityDate(ActivityType.FERTILISATION);
    }

    private String getLastActivityDate(ActivityType activityType) {
        return plantActivities.stream()
            .filter(activity -> activity.getActivityType().equals(activityType))
            .max(Comparator.comparing(a -> LocalDate.parse(a.getDate())))
            .map(Activity::getDate)
            .orElseThrow();
    }
}
