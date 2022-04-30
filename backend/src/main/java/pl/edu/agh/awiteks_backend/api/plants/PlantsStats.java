package pl.edu.agh.awiteks_backend.api.plants;

public class PlantsStats {
    private final int totalPlants;
    private final int neglectedPlants;
    private final int wellGroomedPlants;

    public PlantsStats(int totalPlants, int neglectedPlants, int wellGroomedPlants) {
        this.totalPlants = totalPlants;
        this.neglectedPlants = neglectedPlants;
        this.wellGroomedPlants = wellGroomedPlants;
    }

    public int getTotalPlants() {
        return totalPlants;
    }

    public int getNeglectedPlants() {
        return neglectedPlants;
    }

    public int getWellGroomedPlants() {
        return wellGroomedPlants;
    }
}
