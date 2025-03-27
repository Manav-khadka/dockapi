package com.manav.dockapimainserver.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "APIs for user authentication and profile management")
public class UserController {
    
    @Operation(summary = "Get current user profile", description = "Retrieves the profile information of the currently authenticated user")
    @GetMapping("/me")
    public Map<String, Object> getCurrentUser(
            @Parameter(hidden = true) @AuthenticationPrincipal OAuth2User principal) {
        Map<String, Object> userInfo = new HashMap<>();
        Map<String, Object> attributes = principal.getAttributes();
        
        // Common fields across providers
        userInfo.put("id", attributes.get("id"));
        userInfo.put("username", attributes.get("login") != null ? attributes.get("login") : attributes.get("username"));
        userInfo.put("name", attributes.get("name"));
        userInfo.put("email", attributes.get("email"));
        userInfo.put("avatar", attributes.get("avatar_url"));
        
        // Provider-specific fields
        if (attributes.containsKey("html_url")) {
            userInfo.put("profileUrl", attributes.get("html_url")); // GitHub
        } else if (attributes.containsKey("web_url")) {
            userInfo.put("profileUrl", attributes.get("web_url")); // GitLab
        } else if (attributes.containsKey("links")) {
            userInfo.put("profileUrl", ((Map<String, Object>)attributes.get("links")).get("html")); // Bitbucket
        }
        
        return userInfo;
    }

    @Operation(summary = "Login page", description = "Shows login instructions")
    @GetMapping("/login")
    public String login() {
        return "Please login using OAuth2";
    }

    @Operation(summary = "GitHub OAuth login", description = "Redirects to GitHub OAuth login page")
    @GetMapping("/login/github")
    public String loginGithub() {
        return "redirect:/oauth2/authorization/github";
    }

    @Operation(summary = "GitLab OAuth login", description = "Redirects to GitLab OAuth login page")
    @GetMapping("/login/gitlab")
    public String loginGitlab() {
        return "redirect:/oauth2/authorization/gitlab";
    }

    @Operation(summary = "Bitbucket OAuth login", description = "Redirects to Bitbucket OAuth login page")
    @GetMapping("/login/bitbucket")
    public String loginBitbucket() {
        return "redirect:/oauth2/authorization/bitbucket";
    }
}
