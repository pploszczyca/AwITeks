package pl.edu.agh.awiteks_backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.users.body_models.UserForumThreadsSummary;
import pl.edu.agh.awiteks_backend.api.users.body_models.UserInfo;
import pl.edu.agh.awiteks_backend.api.users.body_models.UserMainSummary;
import pl.edu.agh.awiteks_backend.api.users.body_models.UserPlantSummary;
import pl.edu.agh.awiteks_backend.mappers.UserMapper;
import pl.edu.agh.awiteks_backend.models.ActivityType;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.utilities.CalendarUtilities;
import pl.edu.agh.awiteks_backend.utilities.ForumUtilities;
import pl.edu.agh.awiteks_backend.utilities.PlantUtilities;
import java.text.ParseException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final int NUM_OF_MAIN_SUMMARY = 5;

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final CalendarUtilities calendarUtilities;

    private final PlantUtilities plantUtilities;

    private final ForumUtilities forumUtilities;

    public UserInfo getUserInfo(int userId) {
        final User user = userRepository.findById(userId).orElseThrow();
        return userMapper.userToInfo(user);
    }

    public ResponseEntity getUserPlantsCalendar(int userId) {
        final var user = userRepository.findById(userId).orElseThrow();
        final var calendar = calendarUtilities.makeUserCalendar(user);

        final byte[] calendarByte = calendar.toString().getBytes();
        final Resource resource = new ByteArrayResource(calendarByte);

        final HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=my_plant_calendar.ics");
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");

        return ResponseEntity
                .ok()
                .headers(header)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    public UserMainSummary getUserMainSummary(int userId) {
        final User user = userRepository.findById(userId).orElseThrow();

        final List<UserPlantSummary> missedActivities = plantUtilities.getNeglectedPlants(user).stream()
                .map((pair) ->
                       new UserPlantSummary(pair.getLeft().getName(), pair.getRight())
                )
                .limit(NUM_OF_MAIN_SUMMARY).toList();

        final List<UserPlantSummary> futureActivities = user.getUserPlants().stream().map((plant) ->{
            try {
                final List<ActivityType> activities = plantUtilities.getActionsNeededForPlantInFuture(plant);
                return new UserPlantSummary(plant.getName(), activities);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return null;
        }).toList();

        final List<UserForumThreadsSummary> forumThreads = forumUtilities.getNewestForumPostsFromFollowedThreads(user);
        return new UserMainSummary(missedActivities, futureActivities, forumThreads);
    }
}
