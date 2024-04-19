package com.supership.ship.service;

import com.supership.ship.dto.UserProfileDTO;
import org.springframework.stereotype.Service;

@Service
public interface IUserProfileService {
    UserProfileDTO save(UserProfileDTO userProfileDTO);
    UserProfileDTO findUserByUserName(String userName);
}
