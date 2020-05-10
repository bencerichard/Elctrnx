package com.example.elctrnx.repositories;

import com.example.elctrnx.entities.Order;
import com.example.elctrnx.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {

    List<Order> findAllByUser(User user);
}