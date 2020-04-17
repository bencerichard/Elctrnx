package com.example.elctrnx.services;

import com.example.elctrnx.dtos.UserDTO;
import com.example.elctrnx.entities.Roles;
import com.example.elctrnx.entities.User;
import com.example.elctrnx.exceptions.UserNotFoundException;
import com.example.elctrnx.exceptions.UsernameAlreadyUsedException;
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
                    .build();
            userRepository.save(user);
            return userMapper.mapUserToUserDTO(user);
        }
        throw new UsernameAlreadyUsedException("Username " + newUser.getUsername() + " is already used");
    }

    public void deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    public UserDTO update(Integer id, UserDTO userToUpdate) {
        String[] splitName = splitNames(userToUpdate.getFullName());
        Roles role = Roles.builder()
                .roleName(userToUpdate.getRole().getRoleName())
                .roleId(userToUpdate.getRole().getId())
                .build();

        if (userRepository.findById(id).isPresent()) {
            User existingUser = userRepository.findById(id).get();
            existingUser.setEmailAddress(userToUpdate.getEmailAddress());
            existingUser.setFistName(splitName[0]);
            existingUser.setLastName(splitName[1]);
            existingUser.setPassword(userToUpdate.getPassword());
            existingUser.setRole(role);
            userRepository.save(existingUser);
            return userMapper.mapUserToUserDTO(existingUser);
        } else {
            throw new UserNotFoundException(id);
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

}
