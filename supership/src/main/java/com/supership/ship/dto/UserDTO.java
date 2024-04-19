package com.supership.ship.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@Data
//@Builder
public class UserDTO extends AbstractDTO<UserDTO>{

    private String userName;

    private String fullName;

    private Integer gender;

    private String address;

    private String phoneNumber;

    private Date birthday;

    private String email;

    private Date beginWorkDate;

    private Date endWorkDate;

    private String workStoreCode;

    private String hashed_password;

    private String password; // k co

    private Integer isActived; // da set tu dong = 1 khong can truyen tu ngoai vao

    private String role;

    private String notification;

    // Constructor có tham số
    public UserDTO(Long id, String userName, String fullName, String email) {
        super(id); // Gọi constructor của lớp cha với tham số id
        this.userName = userName;
        this.fullName = fullName;
        this.email = email;
    }

}
