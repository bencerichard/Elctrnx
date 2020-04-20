package com.example.elctrnx.repositories;

import com.example.elctrnx.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, Integer> {

    Roles findByRoleName(String name);
}
