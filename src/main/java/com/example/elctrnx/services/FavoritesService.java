package com.example.elctrnx.services;

import com.example.elctrnx.repositories.FavoritesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FavoritesService {
    private final FavoritesRepository favoritesRepository;

    @Transactional
    public void deleteById(Integer id,String username){
        favoritesRepository.deleteFavoritesByProductIdAndUser_Username(id,username);
    }

    @Transactional
    public void deleteByUser(String username){
        favoritesRepository.deleteFavoritesByUser_Username(username);
    }
}
