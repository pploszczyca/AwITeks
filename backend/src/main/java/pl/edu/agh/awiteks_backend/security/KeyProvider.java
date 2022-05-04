package pl.edu.agh.awiteks_backend.security;

import org.springframework.stereotype.Component;

@Component
public interface KeyProvider {
    byte[] getJwtSecretKey();
}
