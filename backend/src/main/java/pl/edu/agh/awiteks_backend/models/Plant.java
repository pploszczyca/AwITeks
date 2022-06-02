package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "plants")
@JsonIgnoreProperties({"user", "plantActivities"})
@Getter
@Setter
@NoArgsConstructor
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
    private boolean sendReminders;

    @Schema(required = true)
    @Lob
    private String photo;

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

    public boolean isSendReminders() {
        return sendReminders;
    }

    public void setSendReminders(boolean sendReminders) {
        this.sendReminders = sendReminders;
    }

    public void toggleSendReminders(){
        this.sendReminders = !this.sendReminders;
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
                .filter(activity -> activity.getActivityType()
                        .equals(activityType))
                .max(Comparator.comparing(a -> LocalDate.parse(a.getDate())))
                .map(Activity::getDate)
                .orElseThrow();
    }

    public void changeIsFavourite() {
        setFavourite(!isFavourite());
    }
}
