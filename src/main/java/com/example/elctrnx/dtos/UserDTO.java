package com.example.elctrnx.dtos;

import com.example.elctrnx.entities.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserDTO implements Serializable {

    private Integer id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private RoleDTO role;
    private List<CartDTO> cart;
    private List<FavoritesDTO> favorites;
    private Image image;
    private AddressDTO addressDTO;
}
