package com.manav.dockapimainserver.services;

import com.manav.dockapimainserver.models.Repository;
import com.manav.dockapimainserver.repositories.RepositoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class RepositoryService {

    @Autowired
    private RepositoryRepository repositoryRepository;

    @Autowired
    private RestTemplate restTemplate;

    public List<Repository> fetchRepositories(String provider, String token) {
        provider = provider.toLowerCase();
        switch (provider) {
            case "github":
                return fetchGitHubRepositories(token);
            case "gitlab":
                return fetchGitLabRepositories(token);
            case "bitbucket":
                return fetchBitbucketRepositories(token);
            default:
                throw new IllegalArgumentException("Unsupported provider: " + provider);
        }
    }

    private List<Repository> fetchGitHubRepositories(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        ResponseEntity<List> response = restTemplate.exchange(
            "https://api.github.com/user/repos",
            HttpMethod.GET,
            entity,
            List.class
        );

        List<Map<String, Object>> repos = response.getBody();
        return repos.stream()
            .map(repo -> {
                Repository repository = new Repository();
                repository.setName((String) repo.get("name"));
                repository.setFullName((String) repo.get("full_name"));
                repository.setRepoProviderId(String.valueOf(repo.get("id")));
                repository.setDescription((String) repo.get("description"));
                repository.setVisibility((String) repo.get("visibility"));
                repository.setDefaultBranch((String) repo.get("default_branch"));
                repository.setCloneUrl((String) repo.get("clone_url"));
                repository.setHtmlUrl((String) repo.get("html_url"));
                repository.setLastActivityAt(Instant.parse((String) repo.get("updated_at")));
                repository.setFetchedAt(Instant.now());
                return repository;
            })
            .toList();
    }

    private List<Repository> fetchGitLabRepositories(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        ResponseEntity<List> response = restTemplate.exchange(
            "https://gitlab.com/api/v4/projects?membership=true",
            HttpMethod.GET,
            entity,
            List.class
        );

        List<Map<String, Object>> repos = response.getBody();
        return repos.stream()
            .map(repo -> {
                Repository repository = new Repository();
                repository.setName((String) repo.get("name"));
                repository.setFullName((String) repo.get("path_with_namespace"));
                repository.setRepoProviderId(String.valueOf(repo.get("id")));
                repository.setDescription((String) repo.get("description"));
                repository.setVisibility((String) repo.get("visibility"));
                repository.setDefaultBranch((String) repo.get("default_branch"));
                repository.setCloneUrl((String) repo.get("http_url_to_repo"));
                repository.setHtmlUrl((String) repo.get("web_url"));
                repository.setLastActivityAt(Instant.parse((String) repo.get("last_activity_at")));
                repository.setFetchedAt(Instant.now());
                return repository;
            })
            .toList();
    }

    private List<Repository> fetchBitbucketRepositories(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        ResponseEntity<Map> response = restTemplate.exchange(
            "https://api.bitbucket.org/2.0/repositories?role=member",
            HttpMethod.GET,
            entity,
            Map.class
        );

        List<Map<String, Object>> repos = (List<Map<String, Object>>) response.getBody().get("values");
        return repos.stream()
            .map(repo -> {
                Repository repository = new Repository();
                repository.setName((String) repo.get("name"));
                repository.setFullName((String) repo.get("full_name"));
                repository.setRepoProviderId(String.valueOf(repo.get("uuid")));
                repository.setDescription((String) repo.get("description"));
                repository.setVisibility(Boolean.TRUE.equals(repo.get("is_private")) ? "private" : "public");
                repository.setDefaultBranch((String) ((Map<String, Object>) repo.get("mainbranch")).get("name"));
                
                Map<String, Object> links = (Map<String, Object>) repo.get("links");
                Map<String, Object> clone = (Map<String, Object>) links.get("clone");
                Map<String, Object> html = (Map<String, Object>) links.get("html");
                
                repository.setCloneUrl((String) clone.get("href"));
                repository.setHtmlUrl((String) html.get("href"));
                
                repository.setLastActivityAt(Instant.parse((String) repo.get("updated_on")));
                repository.setFetchedAt(Instant.now());
                return repository;
            })
            .toList();
    }

    public List<Repository> saveRepositories(List<Repository> repositories) {
        return repositoryRepository.saveAll(repositories);
    }
}
