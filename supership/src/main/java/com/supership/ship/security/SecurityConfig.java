//package com.supership.ship.security;
//
//        import org.springframework.beans.factory.annotation.Autowired;
//        import org.springframework.context.annotation.Bean;
//        import org.springframework.context.annotation.Configuration;
//        import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//        import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//        import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//        import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//        import org.springframework.security.core.userdetails.UserDetailsService;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Autowired
//    private CustomUserDetailsService userDetailsService;
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .antMatchers("/public/**").permitAll() // Các URL công khai, không cần xác thực
////                .antMatchers("/user/**").hasAnyRole("USER") // Yêu cầu ROLE "USER" cho các URL trong /user/**
//                .antMatchers("/shipment").permitAll() // Cho phép truy cập API tạo shipment mà không cần xác thực
//                .anyRequest().authenticated() // Tất cả các URL khác yêu cầu xác thực
//                .and()
//                .formLogin()
//                .loginPage("/login") // Trang đăng nhập tùy chỉnh
//                .permitAll()
//                .and()
//                .logout()
//                .permitAll()
//                .and()
//                .csrf().disable();
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService);
//    }
//
//    // Cấu hình phân quyền, CORS, CSRF, ...
//    // ...
//
//    // Cấu hình form-based authentication, OAuth2, ...
//    // ...
//}
//
