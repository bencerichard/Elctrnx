package com.example.elctrnx.mappers;

import com.example.elctrnx.dtos.OrderDTO;
import com.example.elctrnx.entities.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderMapper {

    private final OrderDetailMapper orderDetailMapper;
    private final AddressMapper addressMapper;

    public OrderDTO mapOrderToOrderDTO(Order order) {
        return OrderDTO.builder()
                .deliveryLocation(addressMapper.mapAddressToAddressDTO(order.getDeliveryLocation().getAddress()))
                .orderTimestamp(order.getCreatedAt())
                .userId(order.getUser().getUsername())
                .productsList(orderDetailMapper.mapOrderDetailListToOrderDetailDtoList(order.getOrderDetail()))
                .build();
    }
}
