package com.example.elctrnx.exceptions;

public class ProductsNotAvailableException extends RuntimeException {

    public ProductsNotAvailableException(String message) {
        super(message);
    }
}

