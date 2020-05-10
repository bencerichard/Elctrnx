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
public class StockDTO implements Serializable {

    private Integer id;
    private Integer quantity;
    private Integer productID;
    private Integer locationID;
}
