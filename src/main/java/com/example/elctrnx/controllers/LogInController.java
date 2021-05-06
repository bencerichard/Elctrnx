package com.example.elctrnx.controllers;

import com.example.elctrnx.dtos.LogInDTO;
import com.example.elctrnx.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
//@CrossOrigin(origins = "https://elctrnx-webapp.web.app")
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/login")
public class LogInController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LogInDTO logIn(@RequestBody LogInDTO logInDTO) {
        return userService.validateCredentials(logInDTO);
    }
}
