package com.example.elctrnx.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class User {

    @Id
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String fistName;
    private String lastName;
    private String username;
    private String password;
    private String emailAddress;
    private LocalDateTime registrationDate;

    @ManyToOne(cascade = CascadeType.ALL)
    private Roles role;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Cart> selectedProducts;

    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Favorites> favoritesList;
}
