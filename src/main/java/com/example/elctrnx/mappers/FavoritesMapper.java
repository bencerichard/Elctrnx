package com.example.elctrnx.mappers;

import com.example.elctrnx.dtos.FavoritesDTO;
import com.example.elctrnx.entities.Favorites;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FavoritesMapper {

    public FavoritesDTO mapFavoritesToFavoritesDTO(Favorites favorites){
        return FavoritesDTO.builder()
                .productId(favorites.getProductId())
                .id(favorites.getId())
                .build();
    }

    public List<FavoritesDTO> mapFavoritesListToFavoritesDTOList(List<Favorites> favoritesList){
        return favoritesList.stream().map(this::mapFavoritesToFavoritesDTO).collect(Collectors.toList());
    }

    public Favorites mapFavoritesDTOToFavorites (FavoritesDTO favoritesDTO){
        return Favorites.builder()
                .productId(favoritesDTO.getProductId())
                .id(favoritesDTO.getId())
                .build();
    }

    public List<Favorites> mapFavoritesDTOListToFavoritesList(List<FavoritesDTO> favoritesDTOList){
        return favoritesDTOList.stream().map(this::mapFavoritesDTOToFavorites).collect(Collectors.toList());
    }
}
