package com.supership.ship.api;

import com.supership.ship.dto.ResponseDTO;
import com.supership.ship.dto.UserDTO;
import com.supership.ship.exception.UserException;
import com.supership.ship.request.LoginRequest;
import com.supership.ship.request.RegisterRequest;
import com.supership.ship.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@CrossOrigin
@RestController
public class LoginAPI {

    @Autowired
    private IUserService userService;

//    @GetMapping
//    public String showHomePage(Model model, HttpSession session){
//        UserDTO userDTO = (UserDTO) session.getAttribute("userDTO");
//        if (userDTO != null) {
//            model.addAttribute("userDTO", userDTO); // Thêm userDTO vào model với attribute name là "userDTO"
//        }
//        return "index";
//    }

//    @GetMapping("/login")
//    public String showLogin(Model model){
//        model.addAttribute("loginrequest", new LoginRequest("", ""));
//        return "login";
//    }

    @PostMapping("/login")
    public ResponseDTO handleLogin(@RequestBody LoginRequest loginRequest){
        UserDTO userDTO;
        userDTO = userService.login(loginRequest.getUserName(), loginRequest.getPassword());
        if (userDTO.getNotification() == null) {
            // Đăng nhập thành công
            return new ResponseDTO(200, userDTO, "Đăng nhập thành công");
        } else if (userDTO.getNotification().equals("Tài khoản không tồn tại")){
            // Xử lý trường hợp đăng nhập thất bại
            return new ResponseDTO(401, null, "Tài khoản không tồn tại");
        } else if (userDTO.getNotification().equals("Tài khoản chưa được kích hoạt")){
            // Xử lý trường hợp đăng nhập thất bại
            return new ResponseDTO(401, null, "Tài khoản chưa được kích hoạt");
        } else if (userDTO.getNotification().equals("Mật khẩu không hợp lệ")){ // xem lại
            // Xử lý trường hợp đăng nhập thất bại
            return new ResponseDTO(401, null, "Mật khẩu không hợp lệ");
        }
        return new ResponseDTO(401, null, "Đăng nhập không thành công");
    }

    @GetMapping("/logout")
    public String logout(HttpSession session){
        session.removeAttribute("userDTO");
        return "redirect:/";
    }

//    @GetMapping("/register")
//    public String showRegister(Model model){
//        model.addAttribute("registerrequest", new RegisterRequest()); // Tạo đối tượng để lưu thông tin đăng ký
//        return "register";
//    }

    @PostMapping("/register")
    public ResponseDTO handleRegister(@RequestBody RegisterRequest registerRequest){
        UserDTO userDTO;
        userDTO = userService.register(registerRequest);
        if (userDTO.getNotification() == null){
            return new ResponseDTO(200, userDTO, "Đăng ký tài khoản thành công");
        } else if (userDTO.getNotification().equals("Tài khoản không hợp lệ")){
            // trường hợp trùng username
            return new ResponseDTO(401, null, "Tài khoản không hợp lệ");
        } else if (userDTO.getNotification().equals("Tài khoản đã tồn tại")){
            // trường hợp trùng username
            return new ResponseDTO(401, null, "Tài khoản đã tồn tại");
        } else if (userDTO.getNotification().equals("Mật khẩu không khớp")){
            // trường hợp trùng username
            return new ResponseDTO(401, null, "Mật khẩu không khớp");
        }
        return new ResponseDTO(401, null, "Đăng ký tài khoản không thành công");
    }

    @GetMapping("foo")
    public String foo(){
        throw new UserException("User is not found");
    }



    @GetMapping("/admin")
    public String showAdminPage(HttpSession session){
        UserDTO userDTO = (UserDTO) session.getAttribute("userDTO");
        if (userDTO != null) { // nếu chứa user trả về trang admin
            return "admin";
        } else { // chưa login trả về trang chủ
            return "redirect:/";
        }
    }
}
