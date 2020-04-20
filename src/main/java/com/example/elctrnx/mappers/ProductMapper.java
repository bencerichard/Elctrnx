package com.example.elctrnx.mappers;

import com.example.elctrnx.dtos.ProductDTO;
import com.example.elctrnx.entities.Product;
import org.springframework.stereotype.Component;


@Component
public class ProductMapper {

    public ProductDTO mapProductToProductDto(Product product) {
        return ProductDTO.builder()
                .productName(product.getName())
                .id(product.getProductId())
                .description(product.getDescription())
                .price(product.getPrice())
                .categoryDescription(product.getProductCategory().getDescription())
                .categoryName(product.getProductCategory().getName())
                .image(product.getImage())
                .build();
    }
}
