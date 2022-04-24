package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

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
    private List<Activity> plantActivities;

    public Plant(int id, String name, User user, Species spiece, String note, Insolation actualInsolation, List<Activity> plantActivities) {
        super(id, name);
        this.user = user;
        this.spiece = spiece;
        this.note = note;
        this.actualInsolation = actualInsolation;
        this.plantActivities = plantActivities;
    }

    public Plant(int id, String name, User user, Species spiece, String note, Insolation actualInsolation) {
        this(id, name, user, spiece, note, actualInsolation, new ArrayList<>());
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
                this.plantActivities.stream().map(Activity::copy).toList()
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
