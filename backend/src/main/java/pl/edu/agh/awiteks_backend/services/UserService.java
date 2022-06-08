package pl.edu.agh.awiteks_backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.users.body_models.UserInfo;
import pl.edu.agh.awiteks_backend.mappers.UserMapper;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.utilities.CalendarUtilities;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final CalendarUtilities calendarUtilities;


    public UserInfo getUserInfo(int userId) {
        final User user = userRepository.findById(userId).orElseThrow();
        return userMapper.userToInfo(user);
    }

    public ResponseEntity getUserPlantsCalendar(int userId) {
        final var user = userRepository.findById(userId).orElseThrow();
        final var calendar = calendarUtilities.makeUserCalendar(user);

        System.out.println(calendar.toString());

        final byte[] calendarByte = calendar.toString().getBytes();
        final Resource resource = new ByteArrayResource(calendarByte);

        final HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=my_plant_calendar.ics");
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");

        return ResponseEntity.ok().headers(header).contentType(MediaType.
                        APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
