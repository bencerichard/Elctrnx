package com.example.elctrnx.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class User {

    @Id
    @Column(unique = true)
    @GeneratedValue
    private Integer userId;
    private String fistName;
    private String lastName;
    private String username;
    private String password;
    private String emailAddress;

    @ManyToOne(cascade = CascadeType.ALL)
    private Roles role;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;
}
