package pl.edu.agh.awiteks_backend.security.jwt;

import org.springframework.security.authentication.AbstractAuthenticationToken;

import java.util.Date;

public class JwtAccessToken extends AbstractAuthenticationToken {
    private final String token;
    private final long expireTime; // epoch time
    private final int userId;

    public JwtAccessToken(String token, int userId, long expireTime) {
        super(null);
        this.token = token;
        this.userId = userId;
        this.expireTime = expireTime;
    }

    @Override
    public String getPrincipal() {
        return String.valueOf(userId);
    }

    @Override
    public boolean isAuthenticated() {
        return token != null;
    }

    @Override
    public String getName() {
        return getPrincipal();
    }

    @Override
    public String getCredentials() {
        return token;
    }

    public int getUserId() {
        return userId;
    }

    public long getExpireTime() {
        return expireTime;
    }

    public boolean isExpired() {
        return expireTime - new Date().toInstant().getEpochSecond() < 0;
    }
}
