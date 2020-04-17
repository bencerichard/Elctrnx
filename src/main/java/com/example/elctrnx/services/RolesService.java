package com.example.elctrnx.services;

import com.example.elctrnx.entities.Roles;
import com.example.elctrnx.repositories.RolesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RolesService {

    private final RolesRepository rolesRepository;

    public Roles getRoleByName(String roleName) {
        return rolesRepository.findByRoleName(roleName);
    }
}
