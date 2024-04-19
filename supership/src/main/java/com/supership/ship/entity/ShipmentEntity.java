package com.supership.ship.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shipment")
public class ShipmentEntity extends BaseEntity{

    @Column(name = "totalitems")
    private Long totalItems;

    @Column(name = "paymentmethod")
    private String paymentMethod;

    @Column(name = "totalmoney", precision = 10, scale = 2)
    private BigDecimal totalMoney;

    @Column(name = "shipmentfee", precision = 10, scale = 2)
    private BigDecimal shipmentFee;

    @Column(name = "sendername")
    private String senderName;

    @Column(name = "senderaddress", columnDefinition = "TEXT")
    private String senderAddress;

    @Column(name = "senderphonenumber")
    private String senderPhoneNumber;

    @Column(name = "receivername")
    private String receiverName;

    @Column(name = "receiveraddress", columnDefinition = "TEXT")
    private String receiverAddress;

    @Column(name = "receiverphonenumber")
    private String receiverPhoneNumber;

    @Column(name = "driveruserid")
    private Long driverUserId;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "trackingnumber", unique = true)
    private String trackingNumber;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "updatehistory", columnDefinition = "TEXT")
    private String updateHistory;

    @Column(name = "workstore_code")
    private String workStoreCode;

//    @Column(name = "shipmentstatusid")
//    private Long shipmentStatusId;
//
//    @Column(name = "shipmentstatus")
//    private String shipmentStatus;

    @Column(name = "shipmentstatus_code")
    private String shipmentStatusCode;

    @Column(name = "estimatedeliverydistance", precision = 10, scale = 2)
    private BigDecimal estimateDeliveryDistance;

    @Column(name = "actualdeliverydistance", precision = 10, scale = 2)
    private BigDecimal actualDeliveryDistance;

    @Column(name = "ispaidin")
    private Long isPaidIn;


}
