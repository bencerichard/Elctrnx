package com.example.elctrnx.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Product {

    @Id
    @Column(unique = true)
    @GeneratedValue
    private Integer productId;
    private BigDecimal price;
    private String name;
    private String description;
    private String image;

    @ManyToOne
    private ProductCategory productCategory;
}
