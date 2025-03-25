package com.manav.dockapimainserver.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manav.dockapimainserver.models.Repository;

public interface RepositoryRepository extends JpaRepository<Repository, UUID> {
    
}
