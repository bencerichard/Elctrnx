package com.example.elctrnx.services;

import com.example.elctrnx.dtos.AddressDTO;
import com.example.elctrnx.dtos.OrderDTO;
import com.example.elctrnx.dtos.StockDTO;
import com.example.elctrnx.entities.Address;
import com.example.elctrnx.entities.Location;
import com.example.elctrnx.entities.Order;
import com.example.elctrnx.entities.User;
import com.example.elctrnx.exceptions.OrderNotFoundException;
import com.example.elctrnx.mappers.OrderDetailMapper;
import com.example.elctrnx.mappers.OrderMapper;
import com.example.elctrnx.repositories.AddressRepository;
import com.example.elctrnx.repositories.LocationRepository;
import com.example.elctrnx.repositories.OrderRepository;
import com.example.elctrnx.strategies.DeliveryStrategyInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final OrderDetailMapper orderDetailMapper;
    private final AddressRepository addressRepository;
    private final LocationRepository locationRepository;
    private final DeliveryStrategyInterface deliveryStrategyInterface;
    private final StockService stockService;

    @Autowired
    private UserService userService;

    public OrderDTO getOrderById(Integer id) throws OrderNotFoundException {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            return orderMapper.mapOrderToOrderDTO(orderOptional.get());
        } else {
            throw new OrderNotFoundException("This order doesn't exist");
        }
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        List<StockDTO> orderedProducts = deliveryStrategyInterface.doAlgorithm(orderDTO.getProductsList());
        User user = userService.findUserByUsername(orderDTO.getUserId());
        Order order = Order.builder()
                .deliveryLocation(this.testLocationExistence(orderDTO.getUserId() + "'s location", orderDTO.getDeliveryLocation()))
                .createdAt(LocalDateTime.now())
                .user(user)
                .orderDetail(orderDetailMapper.mapOrderDetailListDtoToOrderDetailList(orderDTO.getProductsList()))
                //TODO Change this
                .shippedFrom(locationRepository.findLocationById(2))
                .build();

        order.getOrderDetail().forEach(orderDetail -> orderDetail.setOrder(order));
        orderRepository.save(order);
        orderedProducts.forEach(stockService::updateStock);
        return orderMapper.mapOrderToOrderDTO(order);
    }

    public Address testAddressExistence(String country, String city, String street) {
        Optional<Address> addressOptional = addressRepository.findByCountryAndAndCityAndStreet(country, city, street);
        Address address = null;
        if (addressOptional.isPresent()) {
            address = addressOptional.get();
        } else {
            address = Address.builder()
                    .country(country)
                    .city(city)
                    .street(street)
                    .build();
            addressRepository.save(address);
        }
        return address;
    }

    public Location testLocationExistence(String name, AddressDTO addressDTO) {
        Optional<Location> locationOptional = locationRepository.findByAddress_CountryAndAddress_CityAndAddress_Street
                (addressDTO.getAddressCountry(), addressDTO.getAddressCity(), addressDTO.getAddressStreet());
        Location location = null;

        if (locationOptional.isPresent()) {
            location = locationOptional.get();
        } else {
            location = new Location();
            location.setName(name);
            location.setAddress(
                    this.testAddressExistence(addressDTO.getAddressCountry(), addressDTO.getAddressCity(), addressDTO.getAddressStreet()));
            locationRepository.save(location);
        }
        return location;
    }

    public List<OrderDTO> getOrders() {
        List<OrderDTO> orderDTOS = new ArrayList<>();
        for (Order order : orderRepository.findAll())
            orderDTOS.add(orderMapper.mapOrderToOrderDTO(order));
        return orderDTOS;
    }

    public List<Order> getOrdersForUser(String username) {
        User user = userService.findUserByUsername(username);
        return orderRepository.findAllByUser(user);
    }
}
