package com.example.elctrnx.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
}
