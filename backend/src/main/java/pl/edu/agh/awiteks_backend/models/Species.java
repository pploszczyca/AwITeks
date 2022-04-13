package pl.edu.agh.awiteks_backend.models;

public class Species extends AbstractModel<Species> {
    private static final int NO_CREATOR = -1;
    private int maxAge;
    private Insolation neededInsolation;
    private int waterDose;
    private int waterRoutine;
    private int fertilizationRoutine;
    private Fertilization fertilizationDose;
    private int creatorId;

    public Species(int id, String name, int maxAge, Insolation neededInsolation, int waterDose,
                   int waterRoutine, int fertilizationRoutine, Fertilization fertilizationDose, int creatorID) {
        super(id, name);
        this.maxAge = maxAge;
        this.neededInsolation = neededInsolation;
        this.waterDose = waterDose;
        this.waterRoutine = waterRoutine;
        this.fertilizationRoutine = fertilizationRoutine;
        this.fertilizationDose = fertilizationDose;
        this.creatorId = creatorID;
    }

    public Species(int id, String name, int maxAge, Insolation neededInsolation, int waterDose,
                   int waterRoutine, int fertilizationRoutine, Fertilization fertilizationDose) {
        this(id, name, maxAge, neededInsolation, waterDose, waterRoutine, fertilizationRoutine, fertilizationDose, NO_CREATOR);
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
                this.fertilizationDose,
                this.creatorId
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

    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorId) {
        this.creatorId = creatorId;
    }
}
