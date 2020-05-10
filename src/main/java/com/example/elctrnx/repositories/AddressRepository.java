package com.example.elctrnx.repositories;

import com.example.elctrnx.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Integer> {

    Optional<Address> findByCountryAndAndCityAndStreet(String country, String city, String street);
}
