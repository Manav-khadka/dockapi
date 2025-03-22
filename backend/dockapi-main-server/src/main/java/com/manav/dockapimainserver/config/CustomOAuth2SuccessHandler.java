package com.manav.dockapimainserver.config;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = oauthToken.getPrincipal();

        String registrationId = oauthToken.getAuthorizedClientRegistrationId(); // github or gitlab
        String email = oAuth2User.getAttribute("email");

        String username;
        if ("github".equals(registrationId)) {
            username = oAuth2User.getAttribute("login");
        } else if ("gitlab".equals(registrationId)) {
            username = oAuth2User.getAttribute("username");
        } else {
            throw new IllegalStateException("Unknown registrationId: " + registrationId);
        }

        String jwtToken = jwtService.generateToken(username, email, registrationId);

        // Redirect to frontend with token
        String redirectUrl = "http://localhost:3000/home?token=" + jwtToken + "&provider=" + registrationId;
        response.sendRedirect(redirectUrl);
    }
}
