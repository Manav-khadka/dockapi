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
    
    @Column(length = 255)
    private String name;
    
    @Column(length = 512)
    private String fullName;
    
    @Column(length = 255)
    private String repoProviderId;
    
    @Column(length = 1024)
    private String description;
    
    @Column(length = 50)
    private String visibility;
    
    @Column(length = 255)
    private String defaultBranch;
    
    @Column(length = 512)
    private String cloneUrl;
    
    @Column(length = 512)
    private String htmlUrl;
    
    private Instant lastActivityAt;
    private Instant fetchedAt;
}