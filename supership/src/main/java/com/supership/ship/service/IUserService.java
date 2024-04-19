package com.supership.ship.service;

import com.supership.ship.dto.UserDTO;
import com.supership.ship.request.RegisterRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IUserService {
    UserDTO save(UserDTO userDTO);
    List<UserDTO> findAll(Pageable pageable);
    int totalItem();
    List<UserDTO> findAll();
    UserDTO findUserByUserName(String userName);
    UserDTO deactivateUser(Long id);
    UserDTO login(String userName, String password);
    UserDTO register(RegisterRequest registerRequest);
    String findRoleByUserName(String userName);

}

