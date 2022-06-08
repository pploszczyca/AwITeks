package pl.edu.agh.awiteks_backend.utilities;

import java.text.SimpleDateFormat;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.Date;
import net.fortuna.ical4j.model.Dur;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.Duration;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.Version;
import net.fortuna.ical4j.util.RandomUidGenerator;
import net.fortuna.ical4j.util.UidGenerator;
import pl.edu.agh.awiteks_backend.models.Activity;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.User;

@RequiredArgsConstructor
public class CalendarUtilities {

    private static final String DATE_FORMAT = "yyyy-MM-dd";

    private static final long DAY_TIME = 24 * 60 * 60 * 1000;

    private final SimpleDateFormat simpleDateFormat =
            new SimpleDateFormat(DATE_FORMAT);

    private final UidGenerator uidGenerator = new RandomUidGenerator();

    public Calendar makeUserCalendar(User user) {
        final var calendar = new Calendar();
        calendar.getProperties()
                .add(new ProdId("-//Ben Fortuna//iCal4j 1.0//EN"));
        calendar.getProperties().add(Version.VERSION_2_0);
        calendar.getProperties().add(CalScale.GREGORIAN);

        makePlantsVEvents(user.getUserPlants()).forEach(vEvent -> calendar.getComponents().add(vEvent));

        return calendar;
    }

    private List<VEvent> makePlantsVEvents(List<Plant> plants) {
        return plants.stream().flatMap(
                plant -> plant.getPlantActivities().stream().map(activity -> {
                    final var duration = getDuration(activity);

                    final var event = new VEvent(stringToDate(activity.getDate()), duration,
                            plant.getName() + ": " +
                                    activity.getActivityType().name());
                    event.getProperties().add(uidGenerator.generateUid());

                    return event;
                })).toList();
    }

    private Dur getDuration(Activity activity) {
        final var species = activity.getPlant().getSpecies();
        final var startDate = stringToDate(activity.getDate());
        final Date endDate = switch (activity.getActivityType()) {
            case WATERING -> new Date(
                    startDate.getTime() + species.getWaterRoutine() * DAY_TIME);
            case FERTILISATION -> new Date(startDate.getTime() +
                    species.getFertilizationRoutine() * DAY_TIME);
        };

        return new Duration(startDate, endDate).getDuration();
    }

    @SneakyThrows
    private Date stringToDate(String dateString) {
        return new Date(simpleDateFormat.parse(dateString));
    }
}
