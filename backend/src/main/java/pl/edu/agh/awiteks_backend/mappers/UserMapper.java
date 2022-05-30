package pl.edu.agh.awiteks_backend.mappers;

import org.mapstruct.Mapper;
import pl.edu.agh.awiteks_backend.api.users.body_models.UserInfo;
import pl.edu.agh.awiteks_backend.models.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserInfo userToInfo(User user);
}
