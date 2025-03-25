package com.manav.dockapimainserver.config;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.manav.dockapimainserver.models.LinkedAccount;
import com.manav.dockapimainserver.models.User;
import com.manav.dockapimainserver.repositories.LinkedAccountRepository;
import com.manav.dockapimainserver.repositories.RefreshTokenRepository;
import com.manav.dockapimainserver.repositories.RepositoryRepository;
import com.manav.dockapimainserver.repositories.UserRepository;
import com.manav.dockapimainserver.security.service.RefreshTokenService;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService; // New service for managing refresh tokens
    private final OAuth2AuthorizedClientService authorizedClientService;
    private final UserRepository userRepository;
    private final LinkedAccountRepository linkedAccountRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = oauthToken.getPrincipal();

        String registrationId = oauthToken.getAuthorizedClientRegistrationId(); // github or gitlab
        String email = oAuth2User.getAttribute("email");
        String profileImage;
        // ✅ Get OAuth2 access token
        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
            registrationId, oauthToken.getName());
        String accessToken = authorizedClient.getAccessToken().getTokenValue();
        String username;
        if ("github".equals(registrationId)) {
            username = oAuth2User.getAttribute("login");
            profileImage = oAuth2User.getAttribute("avatar_url"); 
        } else if ("gitlab".equals(registrationId)) {
            username = oAuth2User.getAttribute("username");
            profileImage = oAuth2User.getAttribute("avatar_url");
        } else {
            throw new IllegalStateException("Unknown registrationId: " + registrationId);
        }

        // Check if user exists in the database
        User user = userRepository.findByEmail(email).orElse(null);
        if(user == null){
            user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setProfileImage(profileImage);
            user.setRole("USER");
            userRepository.save(user);
        }

        // check if linked account exists or update if necessary
        LinkedAccount linkedAccount = linkedAccountRepository.findByUserAndProvider(user, registrationId).orElse(new LinkedAccount());
        linkedAccount.setUser(user);
        linkedAccount.setProvider(registrationId);
        linkedAccount.setProviderUserId(oAuth2User.getName());
        linkedAccount.setAccessToken(accessToken);
        linkedAccountRepository.save(linkedAccount);

        // Generate JWT Access Token (Short-lived)
        String jwtToken = jwtService.generateToken(username, email, registrationId);

        // Generate Refresh Token (Long-lived)
        String refreshToken = refreshTokenService.createRefreshToken(username);

        // Create HttpOnly cookie for the JWT token (Access Token)
        Cookie jwtCookie = new Cookie("access_token", jwtToken);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true); // true in production (HTTPS)
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(60 * 15); // 15 mins access token

        // Create HttpOnly cookie for the Refresh Token
        Cookie refreshCookie = new Cookie("refresh_token", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true); // true in production (HTTPS)
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(60 * 60 * 24 * 7); // 7 days refresh token

        // Add cookies to response
        response.addCookie(jwtCookie);
        response.addCookie(refreshCookie);

        // Redirect to frontend
        String redirectUrl = "http://localhost:3000";
        response.sendRedirect(redirectUrl);
    }
}
