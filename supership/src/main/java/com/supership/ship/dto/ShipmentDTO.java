package com.supership.ship.dto;

import com.supership.ship.entity.ShipmentStatusEntity;
import lombok.*;


import javax.persistence.Column;
import java.math.BigDecimal;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShipmentDTO extends AbstractDTO<ShipmentDTO>{

    private Long totalItems;

    private String paymentMethod;

    private BigDecimal totalMoney;

    private BigDecimal shipmentFee;

    private String senderName;

    private String senderAddress;

    private String senderPhoneNumber;

    private String receiverName;

    private String receiverAddress;

    private String receiverPhoneNumber;

    private Long driverUserId;

    private String description;

    private String trackingNumber;

    private String notes;

    private String updateHistory;

    private String workStoreCode;

//    private Long shipmentStatusId;
//
    private String shipmentStatusCode;

    private BigDecimal estimateDeliveryDistance;

    private BigDecimal actualDeliveryDistance;

    private Long isPaidIn;

}
