package com.example.elctrnx.repositories;

import com.example.elctrnx.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findUserByUsername(String user);

    @Transactional
    void deleteByUsername(String username);
}
