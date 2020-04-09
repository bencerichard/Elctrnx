package com.example.elctrnx.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Builder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category")
public class ProductCategory {

    @Id
    @Column(unique = true)
    @GeneratedValue
    private Integer productCategoryId;
    private String name;
    private String description;

    @OneToMany(mappedBy = "productCategory", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Product> products;
}
