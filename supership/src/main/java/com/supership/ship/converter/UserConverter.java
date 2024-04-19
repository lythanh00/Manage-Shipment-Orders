package com.supership.ship.converter;

import com.supership.ship.entity.UserEntity;
import com.supership.ship.dto.UserDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserConverter {
    public UserEntity toEntity(UserDTO dto){
        UserEntity entity = new UserEntity();
        entity.setUserName(dto.getUserName());
        entity.setFullName(dto.getFullName());
        entity.setGender(dto.getGender());
        entity.setAddress(dto.getAddress());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setBirthday(dto.getBirthday());
        entity.setEmail(dto.getEmail());
        entity.setBeginWorkDate(dto.getBeginWorkDate());
        entity.setEndWorkDate(dto.getEndWorkDate());
        entity.setWorkStoreCode(dto.getWorkStoreCode());
//        entity.setPassword(dto.getPassword());
        entity.setPassword(dto.getHashed_password());
        entity.setIsActived(dto.getIsActived());
        entity.setRole(dto.getRole());
        return entity;
    }

    public UserDTO toDTO(UserEntity entity){
        UserDTO dto = new UserDTO();
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
        dto.setBeginWorkDate(entity.getBeginWorkDate());
        dto.setEndWorkDate(entity.getEndWorkDate());
        dto.setWorkStoreCode(entity.getWorkStoreCode());
        dto.setIsActived(entity.getIsActived());
//        List<String> roleCodes = new ArrayList<>();
//        for (RoleEntity role : entity.getRoles()) {
//            roleCodes.add(role.getCode());
//        }
//        dto.setRoleCode(roleCodes);
        dto.setRole(entity.getRole());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setModifiedBy(entity.getModifiedBy());
        dto.setModifiedDate(entity.getModifiedDate());
        return dto;
    }

    public UserEntity toEntity(UserDTO dto, UserEntity entity){
//        entity.setUserName(dto.getUserName());
        entity.setFullName(dto.getFullName());
        entity.setGender(dto.getGender());
        entity.setAddress(dto.getAddress());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setBirthday(dto.getBirthday());
        entity.setEmail(dto.getEmail());
        entity.setBeginWorkDate(dto.getBeginWorkDate());
        entity.setEndWorkDate(dto.getEndWorkDate());
        entity.setWorkStoreCode(dto.getWorkStoreCode());
//        entity.setPassword(dto.getPassword());
        entity.setPassword(dto.getHashed_password());
        entity.setIsActived(dto.getIsActived());
        entity.setRole(dto.getRole());
        return entity;
    }
}
