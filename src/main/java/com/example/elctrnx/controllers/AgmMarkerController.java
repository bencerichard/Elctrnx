package com.example.elctrnx.controllers;


import com.example.elctrnx.data_transfers.agm_markers.dtos.AgmMarkerDto;
import com.example.elctrnx.data_transfers.agm_markers.mapper.AgmMarkerMapper;
import com.example.elctrnx.entities.AgmMarker;
import com.example.elctrnx.services.AgmMarkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/agmMarker")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "https://elctrnx-webapp.web.app")
public class AgmMarkerController {

    private final AgmMarkerService agmMarkerService;

    @PostMapping
    public ResponseEntity<AgmMarkerDto> createAgmMarker(@RequestBody AgmMarkerDto agmMarkerDto) {
        return new ResponseEntity<>(
                AgmMarkerMapper.INSTANCE.agmMarkerToAgmMarkerDto(agmMarkerService.createAgmMarker(agmMarkerDto)),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{agmMarkerId}/{numberOfMonths}")
    public ResponseEntity<AgmMarkerDto> updateAgmMarker(@PathVariable Integer agmMarkerId, @PathVariable Integer numberOfMonths) {
        return new ResponseEntity<>(
                AgmMarkerMapper.INSTANCE.agmMarkerToAgmMarkerDto(agmMarkerService.updateAgmMarker(agmMarkerId, numberOfMonths)),
                HttpStatus.ACCEPTED
        );
    }

    @GetMapping
    public ResponseEntity<List<AgmMarkerDto>> getAgmMarkers() {
        return new ResponseEntity<>(
                agmMarkerService.getAgmMarkers()
                        .stream()
                        .map(AgmMarkerMapper.INSTANCE::agmMarkerToAgmMarkerDto)
                        .collect(Collectors.toList()),
                HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgmMarkerDto> getAgmMarkerById(@PathVariable Integer id) {
        Optional<AgmMarker> agmMarker = agmMarkerService.getAgmMarkerById(id);

        return agmMarker.map(value -> new ResponseEntity<>(
                AgmMarkerMapper.INSTANCE.agmMarkerToAgmMarkerDto(value), HttpStatus.FOUND))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{agmMarkerId}")
    public void deleteAgmMarkerById(@PathVariable Integer agmMarkerId) {
        agmMarkerService.deleteAgmMarker(agmMarkerId);
    }
}
