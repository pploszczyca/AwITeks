package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties({"user"})
public class Plant extends AbstractModel<Plant> {
    private User user;
    private Species species;
    private String note;
    private Insolation actualInsolation;
    private List<Activity> plantActivities;

    public Plant(int id, String name, User user, Species species, String note, Insolation actualInsolation, List<Activity> plantActivities, boolean isFavourite) {
        super(id, name);
        this.user = user;
        this.species = species;
        this.note = note;
        this.actualInsolation = actualInsolation;
        this.plantActivities = plantActivities;
    }

    public Plant(int id, String name, User user, Species species, String note, Insolation actualInsolation) {
        this(id, name, user, species, note, actualInsolation, new ArrayList<>(), false);
    }

    public Plant() {
    }

    @Override
    public Plant copy() {
        return new Plant(
                this.id,
                this.name,
                this.user,
                this.species.copy(),
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

    public Species getSpecies() {
        return species;
    }

    public Insolation getActualInsolation() {
        return actualInsolation;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setSpecies(Species species) {
        this.species = species;
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

    public String getPictureURL() {
        return pictureURL;
    }

    public void setPictureURL(String pictureURL) {
        this.pictureURL = pictureURL;
    }

    public void addActivity(Activity activity){
        plantActivities.add(activity);
        activity.setPlant(this);
    }

    public void removeActivity(Activity activity){
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
