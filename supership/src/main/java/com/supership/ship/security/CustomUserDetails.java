//package com.supership.ship.security;
//
//import com.supership.ship.entity.UserEntity;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class CustomUserDetails implements UserDetails {
//
//    private UserEntity userEntity;
//
//    public CustomUserDetails(UserEntity userEntity) {
//        this.userEntity = userEntity;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        // Lấy trường role của người dùng từ UserEntity
//        String userRole = userEntity.getRole();
//
//        // Tạo một danh sách GrantedAuthority chứa vai trò của người dùng
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        authorities.add(new SimpleGrantedAuthority(userRole));
//
//        return authorities;
//    }
//
//
//    @Override
//    public String getPassword() {
//        return userEntity.getPassword();
//    }
//
//    @Override
//    public String getUsername() {
//        return userEntity.getUserName();
//    }
//
//    // Các phương thức khác của UserDetails cũng cần được triển khai
//    // Như isEnabled(), isAccountNonExpired(), isAccountNonLocked(), isCredentialsNonExpired()...
//
//    public UserEntity getUser() {
//        return userEntity;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        // Triển khai logic kiểm tra tài khoản có hết hạn hay không
//        return true; // hoặc false
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        // Triển khai logic kiểm tra tài khoản có bị khóa hay không
//        return true; // hoặc false
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        // Triển khai logic kiểm tra thông tin xác thực có hết hạn hay không
//        return true; // hoặc false
//    }
//
//    @Override
//    public boolean isEnabled() {
//        // Triển khai logic kiểm tra tài khoản có được kích hoạt hay không
//        return true; // hoặc false
//    }
//
//
//}
//
