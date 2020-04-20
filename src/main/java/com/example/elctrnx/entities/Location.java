package com.example.elctrnx.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Location {

    @Id
    @Column(unique = true)
    @GeneratedValue
    private Integer id;
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Stock> stocks;

    @OneToMany(mappedBy = "shippedFrom", cascade = CascadeType.ALL)
    private List<Order> orders;
}
