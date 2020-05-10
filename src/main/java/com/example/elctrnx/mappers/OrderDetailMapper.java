package com.example.elctrnx.mappers;

import com.example.elctrnx.dtos.OrderDetailDTO;
import com.example.elctrnx.entities.OrderDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderDetailMapper {
    public OrderDetailDTO mapOrderDetailToOrderDetailDto(OrderDetail orderDetail) {
        return OrderDetailDTO.builder()
                .productId(orderDetail.getProductId())
                .quantity(orderDetail.getQuantity())
                .build();
    }

    public List<OrderDetailDTO> mapOrderDetailListToOrderDetailDtoList(List<OrderDetail> orderDetailList) {
        return orderDetailList.stream().map(this::mapOrderDetailToOrderDetailDto).collect(Collectors.toList());
    }

    public OrderDetail mapOrderDetailDtoToOrderDetail(OrderDetailDTO orderDetailDto) {
        return OrderDetail.builder()
                .productId(orderDetailDto.getProductId())
                .quantity(orderDetailDto.getQuantity())
                .build();
    }

    public List<OrderDetail> mapOrderDetailListDtoToOrderDetailList(List<OrderDetailDTO> orderDetailListDto) {
        return orderDetailListDto.stream().map(this::mapOrderDetailDtoToOrderDetail).collect(Collectors.toList());
    }
}
