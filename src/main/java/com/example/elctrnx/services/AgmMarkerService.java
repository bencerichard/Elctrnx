package com.example.elctrnx.services;

import com.example.elctrnx.data_transfers.agm_markers.dtos.AgmMarkerDto;
import com.example.elctrnx.data_transfers.agm_markers.mapper.AgmMarkerMapper;
import com.example.elctrnx.entities.AgmMarker;
import com.example.elctrnx.repositories.AgmMarkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AgmMarkerService {

    private final AgmMarkerRepository agmMarkerRepository;

    public List<AgmMarker> getAgmMarkers() {
        return agmMarkerRepository.findAll();
    }

    public Optional<AgmMarker> getAgmMarkerById(Integer id) {
        return agmMarkerRepository.findById(id);
    }

    public AgmMarker createAgmMarker(AgmMarkerDto agmMarkerDto) {
        return agmMarkerRepository.save(AgmMarkerMapper.INSTANCE.agmMarkerDtoToAgmMarker(agmMarkerDto));
    }

    public AgmMarker updateAgmMarker(Integer agmMarkerId, Integer numberOfMonths) {
        AgmMarker agmMarker = agmMarkerId != null ?
                agmMarkerRepository.findById(agmMarkerId).orElseGet(AgmMarker::new) :
                new AgmMarker();

        agmMarker.setNumberOfDonations(agmMarker.getNumberOfDonations() + numberOfMonths);

        return agmMarkerRepository.save(agmMarker);
    }

    public void deleteAgmMarker(Integer agmMarkerId) {
        Optional<AgmMarker> optionalAgmMarker = getAgmMarkerById(agmMarkerId);
        if (optionalAgmMarker.isPresent()) {
             agmMarkerRepository.deleteById(agmMarkerId);
        }
    }
}

