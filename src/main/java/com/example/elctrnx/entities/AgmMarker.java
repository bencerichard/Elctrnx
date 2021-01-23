package com.example.elctrnx.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AgmMarker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer agmInfoId;

    private Integer numberOfDonations;
    private String name;
    private String lat;
    private String lng;
}
