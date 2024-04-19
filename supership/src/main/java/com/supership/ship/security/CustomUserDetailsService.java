//package com.supership.ship.security;
//
//import com.supership.ship.entity.UserEntity;
//import com.supership.ship.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private UserRepository userRepository; // UserRepository là một lớp tương tác với cơ sở dữ liệu người dùng
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        // Tìm kiếm thông tin người dùng trong cơ sở dữ liệu
//        UserEntity userEntity = userRepository.findByUserName(username);
//        if (userEntity == null) {
//            throw new UsernameNotFoundException("Không tìm thấy người dùng với username: " + username);
//        }
//        // Trả về một đối tượng UserDetails chứa thông tin người dùng
//        return new CustomUserDetails(userEntity);
//    }
//}
//
