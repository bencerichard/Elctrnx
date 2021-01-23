package com.example.elctrnx.controllers;

import com.example.elctrnx.dtos.StockDTO;
import com.example.elctrnx.services.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
//@CrossOrigin(origins = "https://elctrnx-angular.web.app")
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/stocks")
public class StockController {

    private final StockService stockService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StockDTO newProduct(@RequestBody StockDTO stockDTO) {
        return stockService.createStock(stockDTO);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<StockDTO> stockDTOList() {
        return stockService.getAllStocks();
    }
}
