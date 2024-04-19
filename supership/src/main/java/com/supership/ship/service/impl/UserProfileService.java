package com.supership.ship.service.impl;

import com.supership.ship.converter.UserConverter;
import com.supership.ship.converter.UserProfileConverter;
import com.supership.ship.dto.UserProfileDTO;
import com.supership.ship.entity.UserEntity;
import com.supership.ship.hash.Hashing;
import com.supership.ship.repository.UserRepository;
import com.supership.ship.service.IUserProfileService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
@AllArgsConstructor
public class UserProfileService implements IUserProfileService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileConverter userProfileConverter;

    @Autowired
    private Hashing hash;

    @Override
    public UserProfileDTO save(UserProfileDTO userProfileDTO) {
        UserEntity userEntity = new UserEntity();
        Optional<UserEntity> userEntityOptional = userRepository.findById(userProfileDTO.getId());
        UserEntity oldUserEntity = userEntityOptional.orElse(null);
        if (oldUserEntity != null) {
            // bam password
            userProfileDTO.setHashed_password(hash.hashPassword(userProfileDTO.getPassword()));
            userEntity = userProfileConverter.toEntity(userProfileDTO, oldUserEntity);
        } else {
            // Xử lý tình huống khi không tìm thấy người dùng để cập nhật
            // (có thể làm gì đó tùy theo yêu cầu của bạn)
        }

        userEntity = userRepository.save(userEntity);

        return userProfileConverter.toDTO(userEntity);
    }

    @Override
    public UserProfileDTO findUserByUserName(String userName) {
        UserEntity userEntity = userRepository.findByUserName(userName);
        if (userEntity != null) {
            return userProfileConverter.toDTO(userEntity);
        }
        return null; // Hoặc có thể ném một ngoại lệ nếu cần thiết
    }
}
