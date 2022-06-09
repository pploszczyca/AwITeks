package pl.edu.agh.awiteks_backend.utilities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.Date;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.RRule;
import net.fortuna.ical4j.model.property.Version;
import net.fortuna.ical4j.util.RandomUidGenerator;
import net.fortuna.ical4j.util.UidGenerator;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.models.ActivityType;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.User;

@RequiredArgsConstructor
public class CalendarUtilities {

    private final SimpleDateFormat simpleDateFormat;

    private final UidGenerator uidGenerator = new RandomUidGenerator();

    public Calendar makeUserCalendar(User user) {
        final var calendar = new Calendar();
        calendar.getProperties()
                .add(new ProdId("-//Ben Fortuna//iCal4j 1.0//EN"));
        calendar.getProperties().add(Version.VERSION_2_0);
        calendar.getProperties().add(CalScale.GREGORIAN);

        makePlantsVEvents(user.getUserPlants())
                .forEach(vEvent -> calendar.getComponents().add(vEvent));

        return calendar;
    }

    private List<VEvent> makePlantsVEvents(List<Plant> plants) {
        return plants
                .stream()
                .flatMap(this::getPlantEventsStream)
                .toList();
    }

    private Stream<VEvent> getPlantEventsStream(Plant plant) {
        final var lastWateringDate = plant.getLastWateringDate();
        final var lastFertilizationDate =
                plant.getLastFertilizationDate();

        return plant
                .getPlantActivities()
                .stream()
                .map(activity -> {
                    final var event = makeEvent(activity, plant);
                    event.getProperties().add(uidGenerator.generateUid());

                    if (isRecurrenceBeApplied(activity, lastWateringDate,
                            lastFertilizationDate)) {
                        addRecurrence(event, activity);
                    }

                    return event;
                });
    }

    private boolean isRecurrenceBeApplied(Activity activity,
                                          String lastWateringDate,
                                          String lastFertilizationDate) {
        final var activityType = activity.getActivityType();
        final var activityDate = activity.getDate();

        return (activityType == ActivityType.WATERING &&
                activityDate.equals(lastWateringDate)) ||
                (activityType == ActivityType.FERTILISATION &&
                        activityDate.equals(lastFertilizationDate));
    }

    private VEvent makeEvent(Activity activity, Plant plant) {
        return new VEvent(stringToDate(activity.getDate()),
                plant.getName() + ": " +
                        activity.getActivityType().name());
    }

    private void addRecurrence(VEvent event, Activity activity) {
        try {
            event.getProperties().add(new RRule(
                    makeRecurrencePattern(getDuration(activity))));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private int getDuration(Activity activity) {
        final var species = activity.getPlant().getSpecies();

        return switch (activity.getActivityType()) {
            case WATERING -> species.getWaterRoutine();
            case FERTILISATION -> species.getFertilizationRoutine();
        };
    }

    @SneakyThrows
    private Date stringToDate(String dateString) {
        final var parsedDate = simpleDateFormat.parse(dateString);

        // We need to add to date one day, because parsing is not correct.
        // It's not the prettiest solution, but it works.
        final var calendar = java.util.Calendar.getInstance();
        calendar.setTime(parsedDate);
        calendar.add(java.util.Calendar.DATE, 1);

        return new Date(calendar.getTime());
    }

    private String makeRecurrencePattern(int days) {
        return "FREQ=DAILY;INTERVAL=" + days;
    }
}
