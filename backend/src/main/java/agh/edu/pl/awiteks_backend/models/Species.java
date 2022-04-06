package agh.edu.pl.awiteks_backend.models;

import java.util.Objects;

public class Species {
    private final int id;
    private final String name;
    private final int maxAge;
    private final Insolation neededInsolation;
    private final int waterDose;
    private final int waterRoutine;
    private final int fertilizationRoutine;
    private final Fertilization fertilizationDose;

    public Species(int id, String name, int maxAge, Insolation neededInsolation, int waterDose, int waterRoutine, int fertilizationRoutine, Fertilization fertilizationDose) {
        this.id = id;
        this.name = name;
        this.maxAge = maxAge;
        this.neededInsolation = neededInsolation;
        this.waterDose = waterDose;
        this.waterRoutine = waterRoutine;
        this.fertilizationRoutine = fertilizationRoutine;
        this.fertilizationDose = fertilizationDose;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
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

    public Species copy() {
        // deep copy needed
        return new Species(
                this.id,
                this.name,
                this.maxAge,
                this.neededInsolation,
                this.waterDose,
                this.waterRoutine,
                this.fertilizationRoutine,
                this.fertilizationDose
        );
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Species species = (Species) o;
        return id == species.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
