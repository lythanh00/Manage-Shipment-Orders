package com.supership.ship.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class RegisterRequest {
    @NotBlank(message = "UserName cannot be blank")
    private String userName;

    @NotBlank(message = "FullName cannot be blank")
    private String fullName;

    @Size(min = 5, max = 20, message = "Password length must be between 5 and 20 characters")
    private String password;

    @Size(min = 5, max = 20, message = "Password confirmation length must be between 5 and 20 characters")
    private String confirmPassword;

    @NotBlank(message = "PhoneNumber cannot be blank")
    private String phoneNumber;
}
