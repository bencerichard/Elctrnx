package com.example.elctrnx.strategies;

import com.example.elctrnx.dtos.OrderDetailDTO;
import com.example.elctrnx.dtos.StockDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface DeliveryStrategyInterface {

    List<StockDTO> doAlgorithm(List<OrderDetailDTO> orderDetailDTOList);
}
