package com.supership.ship.converter;

import com.supership.ship.dto.UserProfileDTO;
import com.supership.ship.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserProfileConverter {
    public UserEntity toEntity(UserProfileDTO dto){
        UserEntity entity = new UserEntity();
        entity.setUserName(dto.getUserName());
        entity.setFullName(dto.getFullName());
        entity.setGender(dto.getGender());
        entity.setAddress(dto.getAddress());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setBirthday(dto.getBirthday());
        entity.setEmail(dto.getEmail());
        entity.setWorkStoreCode(dto.getWorkStoreCode());
//        entity.setPassword(dto.getPassword());
        entity.setPassword(dto.getHashed_password());
        return entity;
    }

    public UserProfileDTO toDTO(UserEntity entity){
        UserProfileDTO dto = new UserProfileDTO();
        if (entity.getId() != null){
            dto.setId(entity.getId());
        }
        dto.setUserName(entity.getUserName());
        dto.setFullName(entity.getFullName());
        dto.setGender(entity.getGender());
        dto.setAddress(entity.getAddress());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setBirthday(entity.getBirthday());
        dto.setEmail(entity.getEmail());
        dto.setWorkStoreCode(entity.getWorkStoreCode());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setModifiedBy(entity.getModifiedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        return dto;
    }

    public UserEntity toEntity(UserProfileDTO dto, UserEntity entity){
//        entity.setUserName(dto.getUserName());
        entity.setFullName(dto.getFullName());
        entity.setGender(dto.getGender());
        entity.setAddress(dto.getAddress());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setBirthday(dto.getBirthday());
        entity.setEmail(dto.getEmail());
        entity.setWorkStoreCode(dto.getWorkStoreCode());
//        entity.setPassword(dto.getPassword());
        entity.setPassword(dto.getHashed_password());
        return entity;
    }
}
