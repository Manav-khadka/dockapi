package com.manav.dockapimainserver.controllers;

import com.manav.dockapimainserver.models.Repository;
import com.manav.dockapimainserver.models.LinkedAccount;
import com.manav.dockapimainserver.repositories.RepositoryRepository;
import com.manav.dockapimainserver.services.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/repositories")
@CrossOrigin(origins = "*")
public class RepositoryController {

    @Autowired
    private RepositoryRepository repositoryRepository;

    @Autowired
    private RepositoryService repositoryService;

    @GetMapping
    public ResponseEntity<List<Repository>> getAllRepositories() {
        return ResponseEntity.ok(repositoryRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Repository> getRepositoryById(@PathVariable UUID id) {
        return repositoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Repository> createRepository(@RequestBody Repository repository) {
        return ResponseEntity.ok(repositoryRepository.save(repository));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Repository> updateRepository(@PathVariable UUID id, @RequestBody Repository repository) {
        if (!repositoryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.setId(id);
        return ResponseEntity.ok(repositoryRepository.save(repository));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepository(@PathVariable UUID id) {
        if (!repositoryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repositoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/fetch/{provider}")
    public ResponseEntity<List<Repository>> fetchRepositories(
            @PathVariable String provider,
            @RequestHeader("Authorization") String token) {
        try {
            List<Repository> repositories = repositoryService.fetchRepositories(provider, token);
            List<Repository> savedRepositories = repositoryService.saveRepositories(repositories);
            return ResponseEntity.ok(savedRepositories);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/by-linked-account/{linkedAccountId}")
    public ResponseEntity<List<Repository>> getRepositoriesByLinkedAccount(@PathVariable UUID linkedAccountId) {
        List<Repository> repositories = repositoryRepository.findByLinkedAccountId(linkedAccountId);
        return ResponseEntity.ok(repositories);
    }
}
