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
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "workstore")
public class WorkStoreEntity {
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

    @Column(name = "storename")
    private String storeName;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "phonenumber")
    private String phoneNumber;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

}
