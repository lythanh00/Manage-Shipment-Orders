package com.supership.ship.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO extends AbstractDTO<ProductDTO> {

    private String productName;

    private BigDecimal weight;

    private Long totalItems;

    private BigDecimal price;

    private Long shipmentId;
}
