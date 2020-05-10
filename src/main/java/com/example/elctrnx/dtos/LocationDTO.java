package com.example.elctrnx.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class LocationDTO implements Serializable {

    private Integer id;
    private String locationName;
    private AddressDTO addressDTO;
}
