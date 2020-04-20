package com.example.elctrnx.mappers;

import com.example.elctrnx.dtos.LogInDTO;
import com.example.elctrnx.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LogInMapper {
    public LogInDTO mapUserToLogInDTO(User user) {
        return LogInDTO.builder()
                .username(user.getUsername())
                .fullName(user.getFistName() + " " + user.getLastName())
                .password(user.getPassword())
                .roles(user.getRole().getRoleName())
                .build();
    }
}
