package com.example.elctrnx.controllers;


import com.example.elctrnx.data_transfers.agm_markers.dtos.AgmMarkerDto;
import com.example.elctrnx.data_transfers.agm_markers.dtos.DonationDto;
import com.example.elctrnx.data_transfers.agm_markers.mapper.DonationMapper;
import com.example.elctrnx.entities.Donation;
import com.example.elctrnx.entities.User;
import com.example.elctrnx.services.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/donation")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "https://elctrnx-webapp.web.app")
public class DonationController {

    private final DonationService donationService;

    @PostMapping
    public ResponseEntity<DonationDto> createDonation(@RequestBody DonationDto donationDTO) {
        try {
            return new ResponseEntity<>(
                    DonationMapper.INSTANCE.donationToDonationDto(donationService.createDonation(donationDTO)),
                    HttpStatus.CREATED
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                    null,
                    HttpStatus.CONFLICT
            );
        }
    }

    @GetMapping
    public ResponseEntity<List<DonationDto>> getAllDonationsForUser(@PathVariable String usermame) {
        return new ResponseEntity<>(
                donationService.getDonationsForUser(usermame)
                        .stream()
                        .map(DonationMapper.INSTANCE::donationToDonationDto)
                        .collect(Collectors.toList())
                , HttpStatus.OK
        );
    }

    @GetMapping("/redeem/{username}")
    public ResponseEntity<DonationDto> getNotRedeemedDonation(@PathVariable String username) {
        User user = donationService.findUserByUsername(username);
        Optional<Donation> optionalDonation = donationService.getNotRedeemedDonation(user.getUserId());
        return optionalDonation.map(value -> new ResponseEntity<>(DonationMapper.INSTANCE.donationToDonationDto(optionalDonation.get()), HttpStatus.ACCEPTED))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{donationId}")
    public void setRedeemedToTrue(@PathVariable Integer donationId){
        donationService.setRedeemedToTrue(donationId);
    }
}
