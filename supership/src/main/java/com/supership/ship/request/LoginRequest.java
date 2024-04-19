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
public class LoginRequest {
    @NotBlank(message = "UserName cannot blank")
    private String userName;
    @Size(min = 5, max = 20, message = "Password length must be between 5 and 20 characters")
    private String password;
}