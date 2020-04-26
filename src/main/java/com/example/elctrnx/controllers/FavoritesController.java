package com.example.elctrnx.controllers;

import com.example.elctrnx.services.FavoritesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/favorites")
public class FavoritesController {

    private final FavoritesService favoritesService;

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
