package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties({"user"})
public class Plant extends AbstractModel<Plant> {
    @Schema(required = true)
    private User user;
    @Schema(required = true)
    private Species spiece;
    private String note;
    @Schema(required = true)
    private Insolation actualInsolation;
    @Schema(required = true)
    private List<Activity> plantActivities = new ArrayList<>();
    @Schema(required = true)
    private boolean isFavourite = false;

    @Autowired
    @Schema(required = true)
    private String url;

    public Plant(int id, String name, User user, Species spiece, String note, Insolation actualInsolation, List<Activity> plantActivities, boolean isFavourite, String url) {
        super(id, name);
        this.user = user;
        this.spiece = spiece;
        this.note = note;
        this.actualInsolation = actualInsolation;
        this.plantActivities = plantActivities;
        this.isFavourite = isFavourite;
        this.url = url;
    }

    public Plant(int id, String name, User user, Species spiece, String note, Insolation actualInsolation, boolean isFavourite, String url) {
        this(id, name, user, spiece, note, actualInsolation, new ArrayList<>(), isFavourite, url);
    }

    public Plant(int id, String name, User user, Species spiece, String note, Insolation actualInsolation, String url) {
        this(id, name, user, spiece, note, actualInsolation, new ArrayList<>(), false, url);
    }


    public Plant(int id, String name, User user, Species spiece, String note, Insolation actualInsolation, List<Activity> plantActivities, String url) {
        super(id, name);
        this.user = user;
        this.spiece = spiece;
        this.note = note;
        this.actualInsolation = actualInsolation;
        this.plantActivities = plantActivities;
        this.url = url;
    }

    public Plant() {
    }

    @Override
    public Plant copy() {
        return new Plant(
                this.id,
                this.name,
                this.user,
                this.spiece.copy(),
                this.note,
                this.actualInsolation,
                this.plantActivities.stream().map(Activity::copy).toList(),
                this.isFavourite,
                this.url
        );
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

}
