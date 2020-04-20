package com.example.elctrnx.mappers;

import com.example.elctrnx.dtos.RoleDTO;
import com.example.elctrnx.entities.Roles;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {

    public RoleDTO mapRoleToRoleDTO(Roles role) {
        return RoleDTO.builder()
                .id(role.getRoleId())
                .roleName(role.getRoleName())
                .build();
    }
}
