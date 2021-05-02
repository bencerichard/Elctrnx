package com.example.elctrnx.mappers;

import com.example.elctrnx.dtos.UserDTO;
import com.example.elctrnx.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final RoleMapper roleMapper;
    private final CartMapper cartMapper;
    private final FavoritesMapper favoritesMapper;
    private final AddressMapper addressMapper;

    public UserDTO mapUserToUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getUserId())
                .firstName(user.getFistName())
                .lastName(user.getLastName())
                .password(user.getPassword())
                .username(user.getUsername())
                .emailAddress(user.getEmailAddress())
                .role(roleMapper.mapRoleToRoleDTO(user.getRole()))
                .cart(cartMapper.mapCartListToCartDTOList(user.getSelectedProducts()))
                .favorites(favoritesMapper.mapFavoritesListToFavoritesDTOList(user.getFavoritesList()))
                .image(user.getImage())
                .addressDTO(addressMapper.mapAddressToAddressDTO(user.getAddress()))
                .build();
    }
}
