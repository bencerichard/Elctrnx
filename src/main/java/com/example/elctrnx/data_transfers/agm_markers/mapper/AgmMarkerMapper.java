package com.example.elctrnx.data_transfers.agm_markers.mapper;

import com.example.elctrnx.data_transfers.agm_markers.dtos.AgmMarkerDto;
import com.example.elctrnx.entities.AgmMarker;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AgmMarkerMapper {

    AgmMarkerMapper INSTANCE = Mappers.getMapper(AgmMarkerMapper.class);

    @Mapping(target = "agmInfoId")
    AgmMarker agmMarkerDtoToAgmMarker(AgmMarkerDto agmMarkerDto);

    @InheritInverseConfiguration
    AgmMarkerDto agmMarkerToAgmMarkerDto(AgmMarker agmMarker);
}
