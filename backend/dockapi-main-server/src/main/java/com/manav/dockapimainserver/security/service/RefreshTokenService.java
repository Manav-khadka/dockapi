package com.manav.dockapimainserver.security.service;

import org.springframework.stereotype.Service;

import com.manav.dockapimainserver.security.models.RefreshToken;

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
        RefreshToken refreshToken = new RefreshToken(); // 7 days
        refreshTokenStore.put(token, refreshToken);
        return token;
    }

    public boolean isValid(String token) {
        RefreshToken refreshToken = refreshTokenStore.get(token);
        return refreshToken != null && refreshToken.getExpiresAt().isAfter(Instant.now());
    }

    public String getUsernameFromToken(String token) {
        RefreshToken refreshToken = refreshTokenStore.get(token);
        return refreshToken != null ? refreshToken.getUser().getUsername() : null;
    }

   
}
