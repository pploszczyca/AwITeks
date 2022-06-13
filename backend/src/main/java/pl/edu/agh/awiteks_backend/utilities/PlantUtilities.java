package pl.edu.agh.awiteks_backend.utilities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.Pair;
import pl.edu.agh.awiteks_backend.models.ActivityType;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.User;

@RequiredArgsConstructor
public class PlantUtilities {
    private static final long DAY_TIME = 24 * 60 * 60 * 1000;

    private final SimpleDateFormat simpleDateFormat;

    public int getNumberOfNeglectedPlants(User user) {
        return getNeglectedPlants(user).size();
    }

    public List<Pair<Plant, List<ActivityType>>> getNeglectedPlants(User user) {
        return findAllPlantsThatNeedActivitiesToday(user).toList();
    }

    public List<Pair<Plant, List<ActivityType>>> findAllPlantsThatNeedNotifications(
            User user) {
        return findAllPlantsThatNeedActivitiesToday(user).filter(
                        plantListPair -> plantListPair.getLeft().isSendReminders())
                .toList();
    }

    public Stream<Pair<Plant, List<ActivityType>>> findAllPlantsThatNeedActivitiesToday(
            User user) {
        return user.getUserPlants().stream().map(plant -> {
            List<ActivityType> actionsNeededToday;
            try {
                actionsNeededToday = getActionsNeededForPlantToday(plant);
            } catch (ParseException e) {
                e.printStackTrace();
                actionsNeededToday = new ArrayList<>();
            }
            return Pair.of(plant, actionsNeededToday);
        }).filter(pair -> !pair.getRight().isEmpty());
    }

    private List<ActivityType> getActionsNeededForPlantToday(Plant plant)
            throws ParseException {
        final Date today = new Date();
        final List<ActivityType> activities = new LinkedList<>();

        final var lastWateringDay =
                this.simpleDateFormat.parse(plant.getLastWateringDate());
        final var nextWateringDate = makeNextDate(lastWateringDay,
                plant.getSpecies().getWaterRoutine());

        final var lastFertilizationDate =
                this.simpleDateFormat.parse(plant.getLastFertilizationDate());
        final var nextFertilizationDate = makeNextDate(lastFertilizationDate,
                plant.getSpecies().getFertilizationRoutine());

        if (nextWateringDate.before(today)) {
            activities.add(ActivityType.WATERING);
        }

        if (nextFertilizationDate.before(today)) {
            activities.add(ActivityType.FERTILISATION);
        }

        return activities;
    }

    public List<ActivityType> getActionsNeededForPlantInFuture(Plant plant)
            throws ParseException {
        final Date today = new Date();
        final List<ActivityType> activities = new LinkedList<>();

        final var lastWateringDay =
                this.simpleDateFormat.parse(plant.getLastWateringDate());
        final var nextWateringDate = makeNextDate(lastWateringDay,
                plant.getSpecies().getWaterRoutine());

        final var lastFertilizationDate =
                this.simpleDateFormat.parse(plant.getLastFertilizationDate());
        final var nextFertilizationDate = makeNextDate(lastFertilizationDate,
                plant.getSpecies().getFertilizationRoutine());

        if (nextWateringDate.after(today)) {
            activities.add(ActivityType.WATERING);
        }

        if (nextFertilizationDate.after(today)) {
            activities.add(ActivityType.FERTILISATION);
        }

        return activities;
    }


    private Date makeNextDate(Date date, int days) {
        return new Date(date.getTime() + (days * DAY_TIME));
    }
}
