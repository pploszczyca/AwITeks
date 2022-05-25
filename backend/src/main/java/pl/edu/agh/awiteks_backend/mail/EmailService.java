package pl.edu.agh.awiteks_backend.mail;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.models.ActivityType;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Service
public class EmailService {
    private static final String DATE_FORMAT = "yyyy-MM-dd";

    private static final long DAY_TIME = 24 * 60 * 60 * 1000;

    private final UserRepository userRepository;

    private final SimpleDateFormat simpleDateFormat;

    @Autowired
    public EmailService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.simpleDateFormat = new SimpleDateFormat(this.DATE_FORMAT);
    }

    @Scheduled(fixedRateString = "PT24H")
    public void sendEmails() {
        userRepository
                .findAll()
                .forEach(this::sendEmailToUserIfNeeded);
    }

    private void sendEmailToUserIfNeeded(User user) {
        final List<Pair<Plant, List<ActivityType>>> listOfPlantsWhichNeedNotification = findAllPlantsThatNeedActivitiesToday(user);

        if (listOfPlantsWhichNeedNotification.size() > 0) {
            sendNotificationEmail(user, listOfPlantsWhichNeedNotification);
        }
    }

    private void sendNotificationEmail(User user, List<Pair<Plant, List<ActivityType>>> plantsToNotify) {
        final String messageHeader = "Dear " + user.getUsername() + "!\nWe regret to inform you that your plants may be dying really soon. To prevent that, you need to take the following actions:";
        final String message = plantsToNotify.stream().map(this::makeLineForPlant).reduce("", (result, element) -> result + element);

        final String messageFooter = "Kind regards,\nTeam AwITeks.";

        try {
            EmailSender.sendEmail(user.getEmail(), "Take care of your plants!", messageHeader + message + messageFooter);
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
    }

    private String makeLineForPlant(Pair<Plant, List<ActivityType>> element) {
        return "Plant: " +
                element.getLeft().getName() +
                " - " +
                element
                        .getRight()
                        .stream()
                        .map(Enum::name)
                        .reduce("", (activityResult, activityElement) -> activityResult + activityElement + " ") +
                "\n";
    }

    private List<Pair<Plant, List<ActivityType>>> findAllPlantsThatNeedActivitiesToday(User user) {
        return user.getUserPlants().stream().map(plant -> {
            List<ActivityType> actionsNeededToday;
            try {
                actionsNeededToday = getActionsNeededForPlantToday(plant);
            } catch (ParseException e) {
                e.printStackTrace();
                actionsNeededToday = new ArrayList<>();
            }
            return Pair.of(plant, actionsNeededToday);
        }).filter(pair -> !pair.getRight().isEmpty()).toList();
    }

    private List<ActivityType> getActionsNeededForPlantToday(Plant plant) throws ParseException {
        final Date today = new Date();
        final List<ActivityType> activities = new LinkedList<>();

        final var lastWateringDay = this.simpleDateFormat.parse(plant.getLastWateringDate());
        final var nextWateringDate = makeNextDate(lastWateringDay, plant.getSpecies().getWaterRoutine());

        final var lastFertilizationDate = this.simpleDateFormat.parse(plant.getLastFertilizationDate());
        final var nextFertilizationDate = makeNextDate(lastFertilizationDate, plant.getSpecies().getFertilizationRoutine());

        if (nextWateringDate.before(today))
            activities.add(ActivityType.WATERING);

        if (nextFertilizationDate.before(today))
            activities.add(ActivityType.FERTILISATION);

        return activities;
    }

    private Date makeNextDate(Date date, int days) {
        return new Date(date.getTime() + (days * DAY_TIME));
    }
}
