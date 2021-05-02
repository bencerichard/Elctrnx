package com.example.elctrnx.services;

import com.example.elctrnx.data_transfers.agm_markers.dtos.DonationDto;
import com.example.elctrnx.data_transfers.agm_markers.mapper.DonationMapper;
import com.example.elctrnx.entities.Donation;
import com.example.elctrnx.entities.User;
import com.example.elctrnx.repositories.DonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;
    private final UserService userService;

    public Donation createDonation(DonationDto donationDTO) throws Exception {
        User user = userService.findUserByUsername(donationDTO.getUserDTO().getUsername());
        Optional<Donation> optionalPreviousDonation = donationRepository.findFirstByUserUserIdAndWasRedeemedFalse(user.getUserId());
        if(!optionalPreviousDonation.isPresent()){
            Donation donation = DonationMapper.INSTANCE.donationDtoToDonation(donationDTO);
            donation.setUser(user);
            return donationRepository.save(donation);
        }else{
            throw new Exception("User has a donation which wasn't redeemed");
        }
    }

    public List<Donation> getDonationsForUser(String usermame) {
        return donationRepository.findAll()
                .stream()
                .filter(donation -> donation.getUser().getUsername().equals(usermame))
                .collect(Collectors.toList());
    }

    public Optional<Donation> getNotRedeemedDonation(Integer userId){
        return donationRepository.findFirstByUserUserIdAndWasRedeemedFalse(userId);
    }

    public User findUserByUsername(String username) {
        return userService.findUserByUsername(username);
    }

    public void setRedeemedToTrue(Integer donationId) {
        Optional<Donation> optionalDonation = donationRepository.findById(donationId);
        if(optionalDonation.isPresent()){
            Donation currentDonation = optionalDonation.get();
            currentDonation.setWasRedeemed(true);
            donationRepository.save(currentDonation);
        }
    }
}
