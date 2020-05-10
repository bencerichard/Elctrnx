package com.example.elctrnx.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class OrderDetailDTO implements Serializable {

    private Integer productId;
    private Integer quantity;
}
