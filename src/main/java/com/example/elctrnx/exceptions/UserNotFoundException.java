package com.example.elctrnx.exceptions;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Integer id) {
        super("Could not find user " + id);
    }

    public UserNotFoundException(String name) {
        super("Could not find user " + name);
    }
}
