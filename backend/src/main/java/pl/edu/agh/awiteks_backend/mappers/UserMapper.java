package pl.edu.agh.awiteks_backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.edu.agh.awiteks_backend.api.auth.body_models.UserRegisterRequestBody;
import pl.edu.agh.awiteks_backend.api.users.body_models.UserInfo;
import pl.edu.agh.awiteks_backend.models.User;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    @Autowired
    protected PasswordEncoder passwordEncoder;

    public abstract UserInfo userToInfo(User user);

    @Mapping(target = "password", expression = "java(passwordEncoder.encode(registerRequestBody.password()))")
    public abstract User registerRequestBodyToUser(
            UserRegisterRequestBody registerRequestBody);
}
