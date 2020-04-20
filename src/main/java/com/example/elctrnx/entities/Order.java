package com.example.elctrnx.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "order_")
public class Order {

    @Id
    @Column(unique = true)
    @GeneratedValue
    private Integer id;

    private LocalDateTime createdAt;

    @ManyToOne
    private Location shippedFrom;

    @ManyToOne
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    private Location deliveryLocation;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetail;
}
