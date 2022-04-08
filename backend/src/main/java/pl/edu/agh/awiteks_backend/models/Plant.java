package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;

@JsonIgnoreProperties({"user"})
public class Plant extends AbstractModel<Plant> {
    private User user;
    private Species spiece;
    private Insolation actualInsolation;
    private Date lastFertilization;
    private Date lastHydration;

    public Plant(int id, String name, User user, Species spiece, Insolation actualInsolation, Date lastFertilization, Date lastHydration) {
        super(id, name);
        this.user = user;
        this.spiece = spiece;
        this.actualInsolation = actualInsolation;
        this.lastFertilization = lastFertilization;
        this.lastHydration = lastHydration;
    }

    public Plant() {
    }

    public Plant(int id, String name, User user, Species species, Insolation actualInsolation) {
        this(id, name, user, species, actualInsolation, new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis()));
    }

    @Override
    public Plant copy() {
        return new Plant(
                this.id,
                this.name,
                this.user,
                this.spiece.copy(),
                this.actualInsolation,
                (Date) this.lastFertilization.clone(),
                (Date) this.lastHydration.clone()
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

    public Date getLastFertilization() {
        return lastFertilization;
    }

    public Date getLastHydration() {
        return lastHydration;
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

    public void setLastFertilization(Date lastFertilization) {
        this.lastFertilization = lastFertilization;
    }

    public void setLastHydration(Date lastHydration) {
        this.lastHydration = lastHydration;
    }
}
