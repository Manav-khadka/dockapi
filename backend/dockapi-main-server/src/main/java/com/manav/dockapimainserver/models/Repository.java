package com.manav.dockapimainserver.models;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "repositories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Repository {
    @Id
    @GeneratedValue
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "linked_account_id", nullable = false)
    private LinkedAccount linkedAccount;
    
    private String name;
    private String fullName;
    private String repoProviderId;
    private String description;
    private String visibility;
    private String defaultBranch;
    private String cloneUrl;
    private String htmlUrl;
    private Instant lastActivityAt;
    private Instant fetchedAt;
}