package com.example.elctrnx.controllers;

import com.example.elctrnx.dtos.FavoritesDTO;
import com.example.elctrnx.services.FavoritesService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "https://elctrnx-webapp.web.app")
@RequestMapping(value = "/favorites")
public class FavoritesController {

    @Autowired
    private FavoritesService favoritesService;

    @DeleteMapping("/{id}/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteFavorites(@PathVariable Integer id, @PathVariable String username) {
        favoritesService.deleteById(id, username);
    }

    @DeleteMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUsersFavorites(@PathVariable String username){
        favoritesService.deleteByUser(username);
    }
}
