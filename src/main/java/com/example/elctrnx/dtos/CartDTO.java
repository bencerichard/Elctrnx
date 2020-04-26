package com.example.elctrnx.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CartDTO {

    private Integer id;
    private Integer productId;
    private Integer quantity;
}
