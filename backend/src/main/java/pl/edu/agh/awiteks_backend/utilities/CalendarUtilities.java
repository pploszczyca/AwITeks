package pl.edu.agh.awiteks_backend.utilities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
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
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.User;

@RequiredArgsConstructor
public class CalendarUtilities {

    private static final String DATE_FORMAT = "yyyy-MM-dd";

    private final SimpleDateFormat simpleDateFormat =
            new SimpleDateFormat(DATE_FORMAT);

    private final UidGenerator uidGenerator = new RandomUidGenerator();

    public Calendar makeUserCalendar(User user) {
        final var calendar = new Calendar();
        calendar.getProperties()
                .add(new ProdId("-//Ben Fortuna//iCal4j 1.0//EN"));
        calendar.getProperties().add(Version.VERSION_2_0);
        calendar.getProperties().add(CalScale.GREGORIAN);

        makePlantsVEvents(user.getUserPlants()).forEach(
                vEvent -> calendar.getComponents().add(vEvent));

        return calendar;
    }

    private List<VEvent> makePlantsVEvents(List<Plant> plants) {
        return plants.stream().flatMap(
                plant -> plant.getPlantActivities().stream().map(activity -> {
                    final var event =
                            new VEvent(stringToDate(activity.getDate()),
                                    plant.getName() + ": " +
                                            activity.getActivityType().name());

                    event.getProperties().add(uidGenerator.generateUid());
                    try {
                        event.getProperties().add(new RRule(
                                makeRecurrencePattern(getDuration(activity))));
                    } catch (ParseException e) {
                        throw new RuntimeException(e);
                    }

                    return event;
                })).toList();
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
        return new Date(simpleDateFormat.parse(dateString));
    }

    private String makeRecurrencePattern(int days) {
        return "FREQ=DAILY;INTERVAL=" + days;
    }
}
