package com.supership.ship.converter;

import com.supership.ship.dto.ProductDTO;
import com.supership.ship.entity.ProductEntity;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter {

    public ProductEntity toEntity(ProductDTO dto){
        ProductEntity entity = new ProductEntity();
        entity.setProductName(dto.getProductName());
        entity.setWeight(dto.getWeight());
        entity.setTotalItems(dto.getTotalItems());
        entity.setPrice(dto.getPrice());
        entity.setShipmentId(dto.getShipmentId());

        return entity;
    }

    public ProductDTO toDTO(ProductEntity entity){
        ProductDTO dto = new ProductDTO();
        if (entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setProductName(entity.getProductName());
        dto.setWeight(entity.getWeight());
        dto.setTotalItems(entity.getTotalItems());
        dto.setPrice(entity.getPrice());
        dto.setShipmentId(entity.getShipmentId());

        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setModifiedBy(entity.getModifiedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        return dto;
    }

    public ProductEntity toEntity(ProductDTO dto, ProductEntity entity){
        entity.setProductName(dto.getProductName());
        entity.setWeight(dto.getWeight());
        entity.setTotalItems(dto.getTotalItems());
        entity.setPrice(dto.getPrice());
        entity.setShipmentId(dto.getShipmentId());

        return entity;
    }

}
