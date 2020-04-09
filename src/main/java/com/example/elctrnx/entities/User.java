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
}
