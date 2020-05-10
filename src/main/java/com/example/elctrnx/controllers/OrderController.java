package com.example.elctrnx.controllers;

import com.example.elctrnx.dtos.OrderDTO;
import com.example.elctrnx.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDTO newOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.createOrder(orderDTO);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrderDTO oneOrder(@PathVariable Integer id) {
        return orderService.getOrderById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<OrderDTO> getOrders() {
        return orderService.getOrders();
    }
}
