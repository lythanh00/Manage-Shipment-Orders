package com.supership.ship.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
public class ProductEntity extends BaseEntity {
    @Column(name = "productname")
    private String productName;

    @Column(name = "weight", precision = 10, scale = 2)
    private BigDecimal weight;

    @Column(name = "totalitems")
    private Long totalItems;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "shipmentid")
    private Long shipmentId;

}
