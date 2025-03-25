package com.manav.dockapimainserver.models;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;
import java.util.List;

@Entity
@Table(name = "linked_accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkedAccount {
    @Id
    @GeneratedValue
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    private String provider;
    private String providerUserId;
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private String scope;
    private Instant expiresAt;
    private Instant linkedAt;
    
    @OneToMany(mappedBy = "linkedAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Repository> repositories;
}