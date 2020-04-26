package com.example.elctrnx.services;

import com.example.elctrnx.repositories.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    @Transactional
    public void deleteById(Integer id, String username) {
        cartRepository.deleteCartByProductIdAndUser_Username(id, username);
    }

    @Transactional
    public void deleteByUser(String username) {
        cartRepository.deleteCartByUser_Username(username);
    }
}
