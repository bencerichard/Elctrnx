package com.example.elctrnx.services;

import com.example.elctrnx.dtos.FavoritesDTO;
import com.example.elctrnx.mappers.FavoritesMapper;
import com.example.elctrnx.mappers.ProductMapper;
import com.example.elctrnx.repositories.FavoritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoritesService {

    @Autowired
    private FavoritesRepository favoritesRepository;

    @Autowired
    private FavoritesMapper favoritesMapper;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductMapper productMapper;

    @Transactional
    public void deleteById(Integer id, String username) {
        favoritesRepository.deleteFavoritesByProductIdAndUser_Username(id, username);
    }

    @Transactional
    public void deleteByUser(String username) {
        favoritesRepository.deleteFavoritesByUser_Username(username);
    }

    public List<FavoritesDTO> getFavoritesforUserWithUsername(String username) {
        return favoritesMapper.mapFavoritesListToFavoritesDTOList(favoritesRepository.getAllByUserUsername(username));
    }
}
