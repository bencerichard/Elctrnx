package com.example.elctrnx.repositories;

import com.example.elctrnx.entities.AgmMarker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgmMarkerRepository extends JpaRepository<AgmMarker, Integer> {
}
