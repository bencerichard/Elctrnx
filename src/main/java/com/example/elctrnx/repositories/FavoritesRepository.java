package com.example.elctrnx.repositories;

import com.example.elctrnx.entities.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Integer> {
    void deleteFavoritesByProductIdAndUser_Username(Integer id, String username);
    void deleteFavoritesByUser_Username(String username);
}
