package com.supership.ship.repository;

import com.supership.ship.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUserName(String userName);
    boolean existsByUserName(String userName);
}
