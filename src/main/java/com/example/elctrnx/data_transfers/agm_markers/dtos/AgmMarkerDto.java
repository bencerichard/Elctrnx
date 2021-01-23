package com.example.elctrnx.data_transfers.agm_markers.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgmMarkerDto {

    private Integer agmInfoId;

    private Integer numberOfDonations;
    private String name;
    private String lat;
    private String lng;
}
