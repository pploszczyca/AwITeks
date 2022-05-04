package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "plants")
@JsonIgnoreProperties({"user"})
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @Schema(required = true)
    private User user;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "species_id", nullable = false)
    @Schema(required = true)
    private Species spiece;
    private String note;
    @Schema(required = true)
    private Insolation actualInsolation;
    @OneToMany(mappedBy = "plant", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<Activity> plantActivities = new ArrayList<>();
    @Schema(required = true)
    private boolean isFavourite = false;

    @Autowired
    @Schema(required = true)
    private String url;

    public Plant(String name, User user, Species spiece, String note, Insolation actualInsolation, List<Activity> plantActivities, boolean isFavourite, String url) {
        this.name = name;
        this.user = user;
        this.spiece = spiece;
        this.note = note;
        this.actualInsolation = actualInsolation;
        this.plantActivities = plantActivities;
        this.isFavourite = isFavourite;
        this.url = url;
    }

    public Plant(String name, User user, Species spiece, String note, Insolation actualInsolation, boolean isFavourite, String url) {
        this(name, user, spiece, note, actualInsolation, new ArrayList<>(), isFavourite, url);
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

    public Species getSpiece() {
        return spiece;
    }

    public Insolation getActualInsolation() {
        return actualInsolation;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setSpiece(Species spiece) {
        this.spiece = spiece;
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
        return isFavourite;
    }

    public void setFavourite(boolean favourite) {
        isFavourite = favourite;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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
}
