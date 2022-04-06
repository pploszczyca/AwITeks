package agh.edu.pl.awiteks_backend.models;

public class Species extends AbstractModel<Species> {
    private int maxAge;
    private Insolation neededInsolation;
    private int waterDose;
    private int waterRoutine;
    private int fertilizationRoutine;
    private Fertilization fertilizationDose;

    public Species(int id, String name, int maxAge, Insolation neededInsolation, int waterDose, int waterRoutine, int fertilizationRoutine, Fertilization fertilizationDose) {
        super(id, name);
        this.maxAge = maxAge;
        this.neededInsolation = neededInsolation;
        this.waterDose = waterDose;
        this.waterRoutine = waterRoutine;
        this.fertilizationRoutine = fertilizationRoutine;
        this.fertilizationDose = fertilizationDose;
    }

    public Species() {

    }

    @Override
    public Species copy() {
        // deep copy needed
        return new Species(
                super.id,
                super.name,
                this.maxAge,
                this.neededInsolation,
                this.waterDose,
                this.waterRoutine,
                this.fertilizationRoutine,
                this.fertilizationDose
        );
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


    public void setMaxAge(int maxAge) {
        this.maxAge = maxAge;
    }

    public void setNeededInsolation(Insolation neededInsolation) {
        this.neededInsolation = neededInsolation;
    }

    public void setWaterDose(int waterDose) {
        this.waterDose = waterDose;
    }

    public void setWaterRoutine(int waterRoutine) {
        this.waterRoutine = waterRoutine;
    }

    public void setFertilizationRoutine(int fertilizationRoutine) {
        this.fertilizationRoutine = fertilizationRoutine;
    }

    public void setFertilizationDose(Fertilization fertilizationDose) {
        this.fertilizationDose = fertilizationDose;
    }
}
