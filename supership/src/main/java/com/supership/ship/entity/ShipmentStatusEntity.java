package com.supership.ship.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shipmentstatus")
public class ShipmentStatusEntity {

    @Id
    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "createdby")
    @CreatedBy
    private String createdBy;

    @Column(name = "createddate")
    @CreatedDate
    private Date createdDate;

    @Column(name = "modifiedby")
    @LastModifiedBy
    private String modifiedBy;

    @Column(name = "modifieddate")
    @LastModifiedDate
    private Date modifiedDate;

    @Column(name = "statusname")
    private String statusName;

//    private List<ShipmentEntity> shipments = new ArrayList<>();
}
