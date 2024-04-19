package com.supership.ship.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO extends AbstractDTO<UserProfileDTO>{
    private String userName;

    private String fullName;

    private Integer gender;

    private String address;

    private String phoneNumber;

    private Date birthday;

    private String email;

    private String workStoreCode;

    private String hashed_password;

    private String password; // k co
}
