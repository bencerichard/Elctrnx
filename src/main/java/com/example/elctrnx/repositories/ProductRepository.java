package com.example.elctrnx.repositories;

import com.example.elctrnx.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
