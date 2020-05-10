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
public class AddressDTO implements Serializable {

    private Integer id;
    private String addressCountry;
    private String addressCity;
    private String addressStreet;
}
