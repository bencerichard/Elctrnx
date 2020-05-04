package com.example.elctrnx.services;

import com.example.elctrnx.dtos.FavoritesDTO;
import com.example.elctrnx.dtos.LogInDTO;
import com.example.elctrnx.dtos.UserDTO;
import com.example.elctrnx.entities.Roles;
import com.example.elctrnx.entities.User;
import com.example.elctrnx.exceptions.UserNotFoundException;
import com.example.elctrnx.exceptions.UsernameAlreadyUsedException;
import com.example.elctrnx.mappers.CartMapper;
import com.example.elctrnx.mappers.FavoritesMapper;
import com.example.elctrnx.mappers.LogInMapper;
import com.example.elctrnx.mappers.UserMapper;
import com.example.elctrnx.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RolesService rolesService;
    private final LogInMapper logInMapper;
    private final CartMapper cartMapper;
    private final FavoritesMapper favoritesMapper;
    private final ProductService productService;

    public List<UserDTO> findAll() {
        List<UserDTO> userList = new ArrayList<>();
        for (User user : userRepository.findAll()) {
            userList.add(userMapper.mapUserToUserDTO(user));
        }
        return userList;
    }

    public String[] splitNames(String name) {
        return name.split(" ", 2);
    }

    public UserDTO save(UserDTO newUser) {
        if (!userRepository.findUserByUsername(newUser.getUsername()).isPresent()) {
            String[] splitName = splitNames(newUser.getFullName());
            Roles role = rolesService.getRoleByName(newUser.getRole().getRoleName());
            User user = User.builder()
                    .emailAddress(newUser.getEmailAddress())
                    .username(newUser.getUsername())
                    .fistName(splitName[0])
                    .lastName(splitName[1])
                    .password(newUser.getPassword())
                    .role(role)
                    .selectedProducts(cartMapper.mapCartDTOListToCartList(newUser.getCart()))
                    .favoritesList(favoritesMapper.mapFavoritesDTOListToFavoritesList(newUser.getFavorites()))
                    .build();
            userRepository.save(user);
            return userMapper.mapUserToUserDTO(user);
        }
        throw new UsernameAlreadyUsedException("Username " + newUser.getUsername() + " is already used");
    }

    public void deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    public UserDTO update(String username, UserDTO userToUpdate) {
        String[] splitName = splitNames(userToUpdate.getFullName());

        Roles role = rolesService.getRoleByName(userToUpdate.getRole().getRoleName());

        if (userRepository.findUserByUsername(username).isPresent()) {
            User existingUser = userRepository.findUserByUsername(username).get();
            existingUser.setUsername(userToUpdate.getUsername());
            existingUser.setEmailAddress(userToUpdate.getEmailAddress());
            existingUser.setFistName(splitName[0]);
            existingUser.setLastName(splitName[1]);
            existingUser.setPassword(userToUpdate.getPassword());
            existingUser.setRole(role);
            userRepository.save(existingUser);
            return userMapper.mapUserToUserDTO(existingUser);
        } else {
            throw new UserNotFoundException(username);
        }
    }

    public User findUserByUsername(String username) {
        if (userRepository.findUserByUsername(username).isPresent())
            return userRepository.findUserByUsername(username).get();
        else
            throw new UserNotFoundException(username);
    }

    public UserDTO findByUsername(String username) {
        Optional<User> userOptional = userRepository.findUserByUsername(username);
        if (userOptional.isPresent()) {
            return userMapper.mapUserToUserDTO(userOptional.get());
        } else {
            throw new UserNotFoundException(username);
        }
    }

    public LogInDTO validateCredentials(LogInDTO logInDTO) {
        Optional<User> optionalUser = userRepository.findUserByUsername(logInDTO.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(logInDTO.getPassword())) {
                LogInDTO.builder()
                        .username(logInDTO.getUsername())
                        .password(logInDTO.getPassword())
                        .fullName(logInDTO.getFullName())
                        .roles(logInDTO.getRoles())
                        .build();
                return logInMapper.mapUserToLogInDTO(user);
            }
        }
        throw new UserNotFoundException(logInDTO.getUsername());
    }

    public UserDTO postCart(String username, UserDTO userDTO) {
        Optional<User> optionalUser = userRepository.findUserByUsername(username);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setSelectedProducts(cartMapper.mapCartDTOListToCartList(userDTO.getCart()));
            existingUser.getSelectedProducts().forEach(selectedProduct -> selectedProduct.setUser(existingUser));
            userRepository.save(existingUser);
            return userMapper.mapUserToUserDTO(existingUser);
        }
        throw new UserNotFoundException(username);
    }

    public UserDTO postFavorites(String username, FavoritesDTO favoritesDTO) {
        List<FavoritesDTO> favoritesDTOList = new ArrayList<>();
        favoritesDTOList.add(favoritesDTO);

        Optional<User> optionalUser = userRepository.findUserByUsername(username);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setFavoritesList(favoritesMapper.mapFavoritesDTOListToFavoritesList(favoritesDTOList));
            existingUser.getFavoritesList().forEach(favoritesList -> favoritesList.setUser(existingUser));
            userRepository.save(existingUser);
            return userMapper.mapUserToUserDTO(existingUser);
        }
        throw new UserNotFoundException(username);
    }

    public List<String> getAllUsernames(String username) {
        List<User> users = userRepository.findAll();
        List<String> usernameList = new ArrayList<>();

        users.forEach( user ->
                {
                    if(!user.getUsername().equals(username))
                    usernameList.add(user.getUsername());
                }
        );
        return usernameList;
    }
}
