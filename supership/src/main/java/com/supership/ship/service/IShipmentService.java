package com.supership.ship.service;

import com.supership.ship.dto.ShipmentDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IShipmentService {
    ShipmentDTO save(ShipmentDTO shippingInvoiceDTO);
    void delete(long[] ids);
    List<ShipmentDTO> findAll(Pageable pageable);
    int totalItem();
    List<ShipmentDTO> findAll();
    ShipmentDTO findShipmentByTrackingNumber(String trackingNumber);

    ShipmentDTO updateShipmentStatus(long shipmentId, String newStatus);

    ShipmentDTO updateDriverUser(long shipmentId, long driverUserId);

    ShipmentDTO updateWorkStore(long shipmentId, String workStore);

    List<ShipmentDTO> getAllShipmentByCreatedBy(String userName);
}
