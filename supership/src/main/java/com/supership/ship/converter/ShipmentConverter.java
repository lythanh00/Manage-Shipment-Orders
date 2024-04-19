package com.supership.ship.converter;

import com.supership.ship.dto.ShipmentDTO;
import com.supership.ship.entity.ShipmentEntity;
import org.springframework.stereotype.Component;

@Component
public class ShipmentConverter {

    public ShipmentEntity toEntity(ShipmentDTO dto){
        ShipmentEntity entity = new ShipmentEntity();
        entity.setTotalItems(dto.getTotalItems());
        entity.setPaymentMethod(dto.getPaymentMethod());
        entity.setTotalMoney(dto.getTotalMoney());
        entity.setShipmentFee(dto.getShipmentFee());
        entity.setTotalItems(dto.getTotalItems());
        entity.setSenderName(dto.getSenderName());
        entity.setSenderAddress(dto.getSenderAddress());
        entity.setSenderPhoneNumber(dto.getSenderPhoneNumber());
        entity.setReceiverName(dto.getReceiverName());
        entity.setReceiverAddress(dto.getReceiverAddress());
        entity.setReceiverPhoneNumber(dto.getReceiverPhoneNumber());
        entity.setDriverUserId(dto.getDriverUserId());
        entity.setDescription(dto.getDescription());
        entity.setTrackingNumber(dto.getTrackingNumber());
        entity.setNotes(dto.getNotes());
        entity.setUpdateHistory(dto.getUpdateHistory());
        entity.setWorkStoreCode(dto.getWorkStoreCode());
//        entity.setShipmentStatusId(dto.getShipmentStatusId());
        entity.setShipmentStatusCode(dto.getShipmentStatusCode());
        entity.setEstimateDeliveryDistance(dto.getEstimateDeliveryDistance());
        entity.setActualDeliveryDistance(dto.getActualDeliveryDistance());
        entity.setIsPaidIn(dto.getIsPaidIn());

        entity.setCreatedBy(dto.getCreatedBy());
        entity.setModifiedBy(dto.getModifiedBy());

        return entity;
    }

    public ShipmentDTO toDTO(ShipmentEntity entity){
        ShipmentDTO dto = new ShipmentDTO();
        if (entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setTotalItems(entity.getTotalItems());
        dto.setPaymentMethod(entity.getPaymentMethod());
        dto.setTotalMoney(entity.getTotalMoney());
        dto.setShipmentFee(entity.getShipmentFee());
        dto.setTotalItems(entity.getTotalItems());
        dto.setSenderName(entity.getSenderName());
        dto.setSenderAddress(entity.getSenderAddress());
        dto.setSenderPhoneNumber(entity.getSenderPhoneNumber());
        dto.setReceiverName(entity.getReceiverName());
        dto.setReceiverAddress(entity.getReceiverAddress());
        dto.setReceiverPhoneNumber(entity.getReceiverPhoneNumber());
        dto.setDriverUserId(entity.getDriverUserId());
        dto.setDescription(entity.getDescription());
        dto.setTrackingNumber(entity.getTrackingNumber());
        dto.setNotes(entity.getNotes());
        dto.setUpdateHistory(entity.getUpdateHistory());
        dto.setWorkStoreCode(entity.getWorkStoreCode());
//        dto.setShipmentStatusId(entity.getShipmentStatusId());
        dto.setShipmentStatusCode(entity.getShipmentStatusCode());
        dto.setEstimateDeliveryDistance(entity.getEstimateDeliveryDistance());
        dto.setActualDeliveryDistance(entity.getActualDeliveryDistance());
        dto.setIsPaidIn(entity.getIsPaidIn());

        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setModifiedBy(entity.getModifiedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        return dto;
    }

    public ShipmentEntity toEntity(ShipmentDTO dto, ShipmentEntity entity){
        entity.setTotalItems(dto.getTotalItems());
        entity.setPaymentMethod(dto.getPaymentMethod());
        entity.setTotalMoney(dto.getTotalMoney());
        entity.setShipmentFee(dto.getShipmentFee());
        entity.setTotalItems(dto.getTotalItems());
        entity.setSenderName(dto.getSenderName());
        entity.setSenderAddress(dto.getSenderAddress());
        entity.setSenderPhoneNumber(dto.getSenderPhoneNumber());
        entity.setReceiverName(dto.getReceiverName());
        entity.setReceiverAddress(dto.getReceiverAddress());
        entity.setReceiverPhoneNumber(dto.getReceiverPhoneNumber());
        entity.setDriverUserId(dto.getDriverUserId());
        entity.setDescription(dto.getDescription());
//        entity.setTrackingNumber(dto.getTrackingNumber());
        entity.setNotes(dto.getNotes());
        entity.setUpdateHistory(dto.getUpdateHistory());
        entity.setWorkStoreCode(dto.getWorkStoreCode());
//        entity.setShipmentStatusId(dto.getShipmentStatusId());
////        entity.setShipmentStatus(dto.getShipmentStatus());
//        entity.setShipmentStatusCode(dto.getShipmentStatusCode());
        entity.setEstimateDeliveryDistance(dto.getEstimateDeliveryDistance());
        entity.setActualDeliveryDistance(dto.getActualDeliveryDistance());
        entity.setIsPaidIn(dto.getIsPaidIn());

        return entity;
    }

}
