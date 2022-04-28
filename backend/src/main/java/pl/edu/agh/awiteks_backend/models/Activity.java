package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

@JsonIgnoreProperties({"plant"})
public class Activity {
    @Schema(required = true)
    private int id;
    @Schema(required = true)
    private Plant plant;
    @Schema(required = true)
    private ActivityType activityType;
    @Schema(required = true)
    private String date;


    public Activity(int id, Plant plant, ActivityType activityType, String date) {
        this.id = id;
        this.plant = plant;
        this.activityType = activityType;
        this.date = date;
    }

    public Activity() {

    }

    public ActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Activity copy() {
        return new Activity(
                id,
                plant,
                activityType,
                date);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Plant getPlant() {
        return plant;
    }

    public void setPlant(Plant plant) {
        this.plant = plant;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Activity activity = (Activity) o;
        return id == activity.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
