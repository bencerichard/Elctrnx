package com.example.elctrnx.exceptions;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(String message)
    {
        super(message);
    }
}
