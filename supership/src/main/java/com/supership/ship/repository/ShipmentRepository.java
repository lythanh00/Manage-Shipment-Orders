package com.supership.ship.repository;

import com.supership.ship.entity.ShipmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShipmentRepository extends JpaRepository<ShipmentEntity, Long> {
    ShipmentEntity findShipmentByTrackingNumber(String trackingNumber);
    List<ShipmentEntity> findAllShipmentByCreatedBy(String userName);

}
