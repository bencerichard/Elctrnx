package com.example.elctrnx.data_transfers.agm_markers.dtos;
import com.example.elctrnx.dtos.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class DonationDto {

    private Integer donationId;
    private UserDTO userDTO;
    private String familyName;
    private Integer amount;
    private Boolean wasRedeemed;
}
