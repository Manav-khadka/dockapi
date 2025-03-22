package com.manav.dockapimainserver.security.service;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class RefreshTokenService {

    // This should be a database table in production!
    private final Map<String, RefreshToken> refreshTokenStore = new HashMap<>();

    public String createRefreshToken(String username) {
        String token = UUID.randomUUID().toString();
        RefreshToken refreshToken = new RefreshToken(token, username, Instant.now().plusSeconds(60 * 60 * 24 * 7)); // 7 days
        refreshTokenStore.put(token, refreshToken);
        return token;
    }

    public boolean isValid(String token) {
        RefreshToken refreshToken = refreshTokenStore.get(token);
        return refreshToken != null && refreshToken.getExpiryDate().isAfter(Instant.now());
    }

    public String getUsernameFromToken(String token) {
        RefreshToken refreshToken = refreshTokenStore.get(token);
        return refreshToken != null ? refreshToken.getUsername() : null;
    }

    // Model class for refresh token
    private static class RefreshToken {
        private final String token;
        private final String username;
        private final Instant expiryDate;

        public RefreshToken(String token, String username, Instant expiryDate) {
            this.token = token;
            this.username = username;
            this.expiryDate = expiryDate;
        }

        public String getToken() {
            return token;
        }

        public String getUsername() {
            return username;
        }

        public Instant getExpiryDate() {
            return expiryDate;
        }
    }
}
