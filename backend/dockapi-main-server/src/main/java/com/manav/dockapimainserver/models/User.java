package com.manav.dockapimainserver.models;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

import com.manav.dockapimainserver.security.models.RefreshToken;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue
    private UUID id;
    
    private String username;
    private String email;
    private String profileImage;
    private String role;
    
    @Column(updatable = false)
    private Instant createdAt;
    private Instant updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LinkedAccount> linkedAccounts;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RefreshToken> refreshTokens;
}