package pl.edu.agh.awiteks_backend.mail;

import java.util.List;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.agh.awiteks_backend.models.ActivityType;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.utilities.PlantUtilities;

@Service
public class EmailService {
    private static final long INITIAL_DELAY = 5000;

    private final UserRepository userRepository;

    private final PlantUtilities plantUtilities;


    @Autowired
    public EmailService(UserRepository userRepository,
                        PlantUtilities plantUtilities) {
        this.userRepository = userRepository;
        this.plantUtilities = plantUtilities;
    }

    @Scheduled(fixedRateString = "PT24H", initialDelay = INITIAL_DELAY)
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true, noRollbackFor = Exception.class)
    public void sendEmails() {
        userRepository
                .findAll()
                .forEach(this::sendEmailToUserIfNeeded);
    }

    private void sendEmailToUserIfNeeded(User user) {
        final List<Pair<Plant, List<ActivityType>>>
                listOfPlantsWhichNeedNotification =
                plantUtilities.findAllPlantsThatNeedNotifications(user);

        if (listOfPlantsWhichNeedNotification.size() > 0) {
            sendNotificationEmail(user, listOfPlantsWhichNeedNotification);
        }
    }

    private void sendNotificationEmail(User user,
                                       List<Pair<Plant, List<ActivityType>>> plantsToNotify) {
        final String messageHeader = "Dear " + user.getUsername() +
                "!\nWe regret to inform you that your plants may be dying really soon. To prevent that, you need to take the following actions:\n";
        final String message =
                plantsToNotify.stream().map(this::makeLineForPlant)
                        .reduce("", (result, element) -> result + element);

        final String messageFooter = "Kind regards,\nTeam AwITeks.";

        try {
            EmailSender.sendEmail(user.getEmail(), "Take care of your plants!",
                    messageHeader + message + messageFooter);
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
                        .reduce("", (activityResult, activityElement) ->
                                activityResult + activityElement + " ") +
                "\n";
    }
}
