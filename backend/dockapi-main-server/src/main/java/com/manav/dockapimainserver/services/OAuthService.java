package com.manav.dockapimainserver.services;

import java.util.List;
import java.util.Map;
import java.time.Instant;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import com.manav.dockapimainserver.models.LinkedAccount;
import com.manav.dockapimainserver.models.Repository;
import com.manav.dockapimainserver.models.User;
import com.manav.dockapimainserver.repositories.LinkedAccountRepository;
import com.manav.dockapimainserver.repositories.RepositoryRepository;
import com.manav.dockapimainserver.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final UserRepository userRepository;
    private final LinkedAccountRepository linkedAccountRepository;
    private final RepositoryRepository repositoryRepository;
    private final WebClient webClient;

    public User processOAuthUser(OAuth2User oAuth2User, String provider, String accessToken) {
        final String email = "bitbucket".equals(provider) ? 
            fetchBitbucketEmail(accessToken) : 
            oAuth2User.getAttribute("email");
        String username = extractUsername(oAuth2User, provider);
        String profileImage = oAuth2User.getAttribute("avatar_url");

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User(null, username, email, profileImage, "USER", null, null, null, null);
            return userRepository.save(newUser);
        });

        LinkedAccount linkedAccount = linkedAccountRepository.findByUserAndProvider(user, provider)
                .orElse(new LinkedAccount(null, user, provider, oAuth2User.getName(), accessToken, profileImage, profileImage, profileImage, null, null, null));
        linkedAccount.setAccessToken(accessToken);
        linkedAccountRepository.save(linkedAccount);

        updateUserRepositories(linkedAccount);

        return user;
    }

    private void updateUserRepositories(LinkedAccount linkedAccount) {
        List<Repository> repositories = repositoryRepository.findByLinkedAccountId(linkedAccount.getId());
        if (repositories.isEmpty()) {
            // Fetch and save repositories
            List<Repository> fetchedRepositories = fetchRepositories(linkedAccount);
            repositoryRepository.saveAll(fetchedRepositories);
        } else {
            // Update existing repositories
            List<Repository> updatedRepositories = fetchRepositories(linkedAccount);
            repositories.forEach(existingRepo -> {
                updatedRepositories.stream()
                    .filter(newRepo -> newRepo.getRepoProviderId().equals(existingRepo.getRepoProviderId()))
                    .findFirst()
                    .ifPresent(newRepo -> {
                        existingRepo.setName(newRepo.getName());
                        existingRepo.setFullName(newRepo.getFullName());
                        existingRepo.setDescription(newRepo.getDescription());
                        existingRepo.setVisibility(newRepo.getVisibility());
                        existingRepo.setDefaultBranch(newRepo.getDefaultBranch());
                        existingRepo.setCloneUrl(newRepo.getCloneUrl());
                        existingRepo.setHtmlUrl(newRepo.getHtmlUrl());
                        existingRepo.setLastActivityAt(newRepo.getLastActivityAt());
                        existingRepo.setFetchedAt(Instant.now());
                    });
            });
            repositoryRepository.saveAll(repositories);
        }
    }

    private List<Repository> fetchRepositories(LinkedAccount linkedAccount) {
        String provider = linkedAccount.getProvider().toLowerCase();
        String token = linkedAccount.getAccessToken();
        
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> repos = webClient.get()
            .uri(getProviderApiUrl(provider))
            .headers(h -> h.setBearerAuth(token))
            .retrieve()
            .bodyToMono(List.class)
            .block();

        return repos.stream()
            .map(repo -> mapToRepository((Map<String, Object>) repo, linkedAccount, provider))
            .toList();
    }

    private String getProviderApiUrl(String provider) {
        return switch (provider) {
            case "github" -> "https://api.github.com/user/repos";
            case "gitlab" -> "https://gitlab.com/api/v4/projects?membership=false";
            case "bitbucket" -> "https://api.bitbucket.org/2.0/repositories?role=member";
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    private Repository mapToRepository(Map<String, Object> repo, LinkedAccount linkedAccount, String provider) {
        Repository repository = new Repository();
        repository.setLinkedAccount(linkedAccount);
        repository.setName((String) repo.get("name"));
        repository.setFullName(getFullName(repo, provider));
        repository.setRepoProviderId(String.valueOf(getProviderId(repo, provider)));
        repository.setDescription((String) repo.get("description"));
        repository.setVisibility(getVisibility(repo, provider));
        repository.setDefaultBranch(getDefaultBranch(repo, provider));
        repository.setCloneUrl(getCloneUrl(repo, provider));
        repository.setHtmlUrl(getHtmlUrl(repo, provider));
        repository.setLastActivityAt(getLastActivityAt(repo, provider));
        repository.setFetchedAt(Instant.now());
        return repository;
    }

    private String getFullName(Map<String, Object> repo, String provider) {
        return switch (provider) {
            case "github" -> (String) repo.get("full_name");
            case "gitlab" -> (String) repo.get("path_with_namespace");
            case "bitbucket" -> (String) repo.get("full_name");
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    private Object getProviderId(Map<String, Object> repo, String provider) {
        return switch (provider) {
            case "github" -> repo.get("id");
            case "gitlab" -> repo.get("id");
            case "bitbucket" -> repo.get("uuid");
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    private String getVisibility(Map<String, Object> repo, String provider) {
        return switch (provider) {
            case "github" -> (String) repo.get("visibility");
            case "gitlab" -> (String) repo.get("visibility");
            case "bitbucket" -> Boolean.TRUE.equals(repo.get("is_private")) ? "private" : "public";
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    private String getDefaultBranch(Map<String, Object> repo, String provider) {
        return switch (provider) {
            case "github" -> (String) repo.get("default_branch");
            case "gitlab" -> (String) repo.get("default_branch");
            case "bitbucket" -> (String) ((Map<String, Object>) repo.get("mainbranch")).get("name");
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    private String getCloneUrl(Map<String, Object> repo, String provider) {
        return switch (provider) {
            case "github" -> (String) repo.get("clone_url");
            case "gitlab" -> (String) repo.get("http_url_to_repo");
            case "bitbucket" -> (String) ((Map<String, Object>) ((Map<String, Object>) repo.get("links")).get("clone")).get("href");
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    private String getHtmlUrl(Map<String, Object> repo, String provider) {
        return switch (provider) {
            case "github" -> (String) repo.get("html_url");
            case "gitlab" -> (String) repo.get("web_url");
            case "bitbucket" -> (String) ((Map<String, Object>) ((Map<String, Object>) repo.get("links")).get("html")).get("href");
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    private Instant getLastActivityAt(Map<String, Object> repo, String provider) {
        String dateStr = switch (provider) {
            case "github" -> (String) repo.get("updated_at");
            case "gitlab" -> (String) repo.get("last_activity_at");
            case "bitbucket" -> (String) repo.get("updated_on");
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
        return Instant.parse(dateStr);
    }

    private String extractUsername(OAuth2User user, String provider) {
        return switch (provider) {
            case "github" -> user.getAttribute("login");
            case "gitlab" -> user.getAttribute("username");
            case "bitbucket" -> user.getAttribute("nickname");
            default -> throw new IllegalStateException("Unknown provider: " + provider);
        };
    }

    private String fetchBitbucketEmail(String accessToken) {
        try {
            return webClient.get()
                .uri("https://api.bitbucket.org/2.0/user/emails")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(Map.class)
                .flatMap(response -> {
                    List<Map<String, Object>> values = (List<Map<String, Object>>) response.get("values");
                    return values.stream()
                        .filter(emailEntry -> Boolean.TRUE.equals(emailEntry.get("is_primary")) &&
                                              Boolean.TRUE.equals(emailEntry.get("is_confirmed")))
                        .map(emailEntry -> (String) emailEntry.get("email"))
                        .findFirst()
                        .map(Mono::just)
                        .orElse(Mono.empty());
                })
                .block(); // Blocking for simplicity
        } catch (Exception e) {
            System.out.println("Failed to fetch Bitbucket email: " + e.getMessage());
            return null;
        }
    }
}
