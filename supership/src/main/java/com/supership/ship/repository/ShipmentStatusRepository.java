package com.supership.ship.repository;

import com.supership.ship.entity.ShipmentStatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipmentStatusRepository extends JpaRepository<ShipmentStatusEntity, String> {
}
