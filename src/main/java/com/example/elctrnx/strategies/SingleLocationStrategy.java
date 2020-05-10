package com.example.elctrnx.strategies;

import com.example.elctrnx.dtos.OrderDetailDTO;
import com.example.elctrnx.dtos.StockDTO;
import com.example.elctrnx.entities.Location;
import com.example.elctrnx.entities.Stock;
import com.example.elctrnx.exceptions.ProductsNotAvailableException;
import com.example.elctrnx.repositories.LocationRepository;
import com.example.elctrnx.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class SingleLocationStrategy implements DeliveryStrategyInterface {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private LocationRepository locationRepository;

    @Override
    public List<StockDTO> doAlgorithm(List<OrderDetailDTO> requested) {

        List<Location> locationList = locationRepository.findAll();
        List<StockDTO> stockList = new ArrayList<>();

        for (Location location : locationList) {
            List<Stock> locationStock = stockRepository.findAllByLocation_Id(location.getId());

            stockList.clear();

            for (Stock currentStock : locationStock) {
                for (OrderDetailDTO requestedStock : requested) {
                    if (currentStock.getProduct().getProductId().equals(requestedStock.getProductId()) && requestedStock.getQuantity() < currentStock.getQuantity()) {
                        stockList.add(
                                StockDTO.builder()
                                        .productID(requestedStock.getProductId())
                                        .locationID(location.getId())
                                        .quantity(requestedStock.getQuantity())
                                        .build()
                        );
                        if (stockList.size() == requested.size())
                            return stockList;
                    }
                }
            }
        }
        throw new ProductsNotAvailableException("Products: " + requested.toString() + " not available in a single location");
    }
}
