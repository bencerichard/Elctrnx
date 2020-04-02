package com.example.elctrnx.entities;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class TestEntity {

    @Id
    @GeneratedValue
    private Integer id;

    private String name;

    private boolean gender;
}
