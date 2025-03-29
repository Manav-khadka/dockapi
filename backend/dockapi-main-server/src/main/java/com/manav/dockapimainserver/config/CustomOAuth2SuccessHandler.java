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

import com.manav.dockapimainserver.models.User;
import com.manav.dockapimainserver.security.service.RefreshTokenService;
import com.manav.dockapimainserver.services.OAuthService;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final OAuth2AuthorizedClientService authorizedClientService;
    private final OAuthService oAuthService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = oauthToken.getPrincipal();

        String registrationId = oauthToken.getAuthorizedClientRegistrationId(); // github, gitlab, bitbucket

        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
            registrationId, oauthToken.getName());
        String accessToken = authorizedClient.getAccessToken().getTokenValue();

        User user = oAuthService.processOAuthUser(oAuth2User, registrationId, accessToken);

        // Generate JWT & Refresh Token
        String jwtToken = jwtService.generateToken(user.getUsername(), user.getEmail(), registrationId);
        String refreshToken = refreshTokenService.createRefreshToken(user.getUsername());

        // Set Cookies
        setCookie(response, "access_token", jwtToken, 3600);
        setCookie(response, "refresh_token", refreshToken, 604800); // 7 days

        // Redirect to frontend
        response.sendRedirect("http://localhost:3000");
    }

    private void setCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }
}
