package com.supership.ship.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class UserEntity extends BaseEntity{

    @Column(name = "username", unique = true)
    private String userName;

    @Column(name = "fullname")
    private String fullName;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "address")
    private String address;

    @Column(name = "phonenumber")
    private String phoneNumber;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "email")
    private String email;

//    @Column(name = "departmentid")
//    private Long departmentId;

    @Column(name = "beginworkdate")
    private Date beginWorkDate;

    @Column(name = "endworkdate")
    private Date endWorkDate;

    @Column(name = "workstore_code")
    private String workStoreCode;

    @Column(name = "password")
    private String password;

    @Column(name = "isactived")
    private Integer isActived;

    @Column(name = "role")
    private String role;


}

