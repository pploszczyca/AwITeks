package pl.edu.agh.awiteks_backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import pl.edu.agh.awiteks_backend.configs.EnvNames;

@Component
public class EnvKeyProvider implements KeyProvider{
    @Value("${" + EnvNames.JWT_SECRET_KEY + "}")
    private String jwtSecretKey;

    @Override
    public byte[] getJwtSecretKey() {
        return jwtSecretKey.getBytes();
    }
}
