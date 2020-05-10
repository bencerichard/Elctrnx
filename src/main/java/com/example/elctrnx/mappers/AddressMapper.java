package com.example.elctrnx.mappers;

import com.example.elctrnx.dtos.AddressDTO;
import com.example.elctrnx.entities.Address;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AddressMapper {

    public AddressDTO mapAddressToAddressDTO(Address address) {
        return AddressDTO.builder()
                .id(address.getId())
                .addressCountry(address.getCountry())
                .addressCity(address.getCity())
                .addressStreet(address.getStreet())
                .build();
    }
}

