package com.example.elctrnx.data_transfers.agm_markers.mapper;

import com.example.elctrnx.data_transfers.agm_markers.dtos.DonationDto;
import com.example.elctrnx.entities.Donation;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface DonationMapper {

    DonationMapper INSTANCE = Mappers.getMapper(DonationMapper.class);

    @Mapping(target = "donationId")
    Donation donationDtoToDonation(DonationDto donationDTO);

    @InheritInverseConfiguration
    DonationDto donationToDonationDto(Donation donation);
}
