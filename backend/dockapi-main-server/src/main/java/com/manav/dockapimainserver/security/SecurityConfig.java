package com.manav.dockapimainserver.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.web.SecurityFilterChain;

import com.manav.dockapimainserver.config.CustomAuthorizationRequestResolver;
import com.manav.dockapimainserver.config.CustomOAuth2SuccessHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2SuccessHandler successHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,ClientRegistrationRepository repo) throws Exception {
          OAuth2AuthorizationRequestResolver resolver =
                new CustomAuthorizationRequestResolver(repo, "/oauth2/authorization");
        http
            .csrf(csrf -> csrf.disable()) // Disable for now; enable CSRF in prod.
            .authorizeHttpRequests(auth -> auth
            .requestMatchers("/swagger-ui/**", "/api-docs/**", "/swagger-ui.html").permitAll()
            .requestMatchers("/api/users/login/**").permitAll()
            .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
            .authorizationEndpoint(authorization -> authorization
            .authorizationRequestResolver(resolver))
                .successHandler(successHandler)
            );

        return http.build();
    }
}
