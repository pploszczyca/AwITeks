package pl.edu.agh.awiteks_backend.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.configs.EnvNames;
import pl.edu.agh.awiteks_backend.security.KeyProvider;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenService {
    private static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS384;

    private static final String EXPIRY_DATE_FIELD = "exp";
    private static final String ISSUER_FIELD = "iss";
    private static final String SUBJECT_FIELD = "sub";
    private static final String ISSUED_AT_FIELD = "iat";

    private static final String ISSUER = "awITeks";

    private final KeyProvider keyProvider;

    @Value("${" + EnvNames.JWT_DEFAULT_EXPIRATION_SECONDS + "}")
    private long jwtExpirationTimeSeconds;

    @Autowired
    public TokenService(KeyProvider keyProvider) {
        this.keyProvider = keyProvider;
    }

    public JwtAccessToken createAccessToken(int userId) {
        Date now = new Date();

        Date expirationDate = Date.from(
                Instant.ofEpochSecond(
                        now.toInstant().getEpochSecond() + jwtExpirationTimeSeconds
                )
        );

        String token = createToken(String.valueOf(userId), expirationDate);
        return new JwtAccessToken(token, userId, expirationDate.toInstant().getEpochSecond());
    }

    public JwtAccessToken parseAccessToken(String token) {
        Claims claims = parseClaims(token);
        return new JwtAccessToken(
                token,
                Integer.parseInt(claims.getSubject()),
                claims.get(EXPIRY_DATE_FIELD, Date.class).toInstant().getEpochSecond()
        );
    }

    private String createToken(String uuid, Date expirationDate) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(EXPIRY_DATE_FIELD, expirationDate.toInstant().getEpochSecond());
        claims.put(ISSUER_FIELD, ISSUER);
        claims.put(SUBJECT_FIELD, uuid);
        claims.put(ISSUED_AT_FIELD, new Date().toInstant().getEpochSecond());

        return Jwts.builder()
                .setSubject(uuid)
                .setClaims(claims)
                .signWith(getSigningKey(), SIGNATURE_ALGORITHM)
                .compact();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(keyProvider.getJwtSecretKey());
    }

    private Claims parseClaims(String token) {
        JwtParser parser = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build();

        Jws<Claims> claims = parser.parseClaimsJws(token);
        return claims.getBody();
    }
}
