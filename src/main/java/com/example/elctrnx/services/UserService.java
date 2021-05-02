package com.example.elctrnx.services;

import com.example.elctrnx.dtos.FavoritesDTO;
import com.example.elctrnx.dtos.LogInDTO;
import com.example.elctrnx.dtos.OrderDTO;
import com.example.elctrnx.dtos.UserDTO;
import com.example.elctrnx.entities.Image;
import com.example.elctrnx.entities.Order;
import com.example.elctrnx.entities.Roles;
import com.example.elctrnx.entities.User;
import com.example.elctrnx.exceptions.UserNotFoundException;
import com.example.elctrnx.exceptions.UsernameAlreadyUsedException;
import com.example.elctrnx.mappers.*;
import com.example.elctrnx.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.LocalDateTime;
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
    private final OrderMapper orderMapper;

    @Autowired
    private OrderService orderService;

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

            Roles role = rolesService.getRoleByName(newUser.getRole().getRoleName());
            User user = User.builder()
                    .emailAddress(newUser.getEmailAddress())
                    .registrationDate(LocalDateTime.now())
                    .username(newUser.getUsername())
                    .fistName(newUser.getFirstName())
                    .lastName(newUser.getLastName())
                    .password(UserService.getMd5(newUser.getPassword()))
                    .role(role)
                    .address(orderService.testAddressExistence(newUser.getAddressDTO().getAddressCountry(),
                            newUser.getAddressDTO().getAddressCity(),
                            newUser.getAddressDTO().getAddressStreet()
                            ))
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
        Roles role = rolesService.getRoleByName(userToUpdate.getRole().getRoleName());

        if (userRepository.findUserByUsername(username).isPresent()) {
            User existingUser = userRepository.findUserByUsername(username).get();
            existingUser.setUsername(userToUpdate.getUsername());
            existingUser.setEmailAddress(userToUpdate.getEmailAddress());
            existingUser.setFistName(userToUpdate.getFirstName());
            existingUser.setLastName(userToUpdate.getLastName());
            existingUser.setPassword(UserService.getMd5(userToUpdate.getPassword()));
            existingUser.setRole(role);
            existingUser.setAddress(orderService.testAddressExistence(userToUpdate.getAddressDTO().getAddressCountry(),
                            userToUpdate.getAddressDTO().getAddressCity(),
                            userToUpdate.getAddressDTO().getAddressStreet()
                    ));
            userRepository.save(existingUser);
            return userMapper.mapUserToUserDTO(existingUser);
        } else {
            throw new UserNotFoundException(username);
        }
    }

    public void setUserImage(String username, Image image) {

        Optional<User> user = userRepository.findUserByUsername(username);

        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setImage(image);
            userRepository.save(existingUser);
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
            if (user.getPassword().equals(UserService.getMd5(logInDTO.getPassword()))) {
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

    public static String getMd5(String input) {
        try {

            // Static getInstance method is called with hashing MD5
            MessageDigest md = MessageDigest.getInstance("MD5");

            // digest() method is called to calculate message digest
            //  of an input digest() return array of byte
            byte[] messageDigest = md.digest(input.getBytes());

            // Convert byte array into signum representation
            BigInteger no = new BigInteger(1, messageDigest);

            // Convert message digest into hex value
            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public Integer getCustomerHoar(String username) {
        Optional<User> optionalUser = userRepository.findUserByUsername(username);
        if (optionalUser.isPresent()) {
            User currentUser = optionalUser.get();
            LocalDateTime start = currentUser.getRegistrationDate();
            LocalDateTime end = LocalDateTime.now();
            Duration diff = Duration.between(start, end);
            long hoar = diff.toDays();
            if (hoar == 0)
                hoar = Long.valueOf(1);
            return (int) hoar;
        }
        return null;
    }

    public List<String> getAllUsernames(String username) {
        List<User> users = userRepository.findAll();
        List<String> usernameList = new ArrayList<>();

        users.forEach(user ->
                {
                    if (!user.getUsername().equals(username))
                        usernameList.add(user.getUsername());
                }
        );
        return usernameList;

    }

    public List<OrderDTO> getAllOrdersForUser(String username) {
        List<Order> ordersList = orderService.getOrdersForUser(username);

        List<OrderDTO> orderDTOS = new ArrayList<>();

        ordersList.forEach(order -> {
            orderDTOS.add(orderMapper.mapOrderToOrderDTO(order));
        });

        return orderDTOS;
    }
}
