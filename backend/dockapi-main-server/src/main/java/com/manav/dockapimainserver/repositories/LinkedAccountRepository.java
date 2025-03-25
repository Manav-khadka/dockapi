package com.manav.dockapimainserver.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manav.dockapimainserver.models.LinkedAccount;
import com.manav.dockapimainserver.models.User;

public interface LinkedAccountRepository extends JpaRepository<LinkedAccount,UUID> {
    Optional<LinkedAccount> findByUserAndProvider(User user, String provider);
    
}