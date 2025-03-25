package com.manav.dockapimainserver.security.models;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

import com.manav.dockapimainserver.models.User;

@Entity
@Table(name = "refresh_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {
    @Id
    @GeneratedValue
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    private String token;
    private Instant expiresAt;
    private Instant createdAt;
}