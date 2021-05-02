package com.example.elctrnx.repositories;

import com.example.elctrnx.entities.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DonationRepository extends JpaRepository<Donation,Integer> {
    Optional<Donation> findFirstByUserUserIdAndWasRedeemedFalse(Integer userId);
}
