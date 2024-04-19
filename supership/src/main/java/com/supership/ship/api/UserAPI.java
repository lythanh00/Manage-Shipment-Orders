package com.supership.ship.api;


import com.supership.ship.api.output.UserOutput;
import com.supership.ship.dto.ResponseDTO;
import com.supership.ship.dto.UserDTO;
import com.supership.ship.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
//@RequestMapping("/user")
public class UserAPI {

    @Autowired
    private IUserService userService;




//    @GetMapping("/search")
//    public ResponseEntity<?> searchUser(@RequestParam(name = "keyword", required = false, defaultValue = "") String name){
//        List<UserDTO> users = userService.searchUser(name);
//        return  ResponseEntity.ok(users);
//    }
//
//    @GetMapping("")
//    public ResponseEntity<?> getListUser(){
//        List<UserDTO> users = userService.getListUser();
//        return ResponseEntity.ok(users);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getUserById(@PathVariable int id){
//        UserDTO result = userService.getUserById(id);
//        return ResponseEntity.ok(result);
//    }

    @GetMapping(value = "/user/{role}")
    public ResponseDTO showUser(@RequestParam(value = "page", required = false) Integer page,
                                @RequestParam(value = "limit", required = false) Integer limit,
                                @RequestParam(value = "userName", required = false) String userName,
                                @PathVariable String role) {
        // if
        // findRoleByUserName
        // middleware kiểm tra user có đúng role không
        // đoạn code phân quyền

        if (!role.equals("ADMIN")){
            return new ResponseDTO(404, null, "User not authenrization");
        }
        UserOutput userOutput = new UserOutput();
        if (userName != null) {
            // Tìm kiếm người dùng theo tên
            UserDTO user = userService.findUserByUserName(userName);
            if (user != null) {
                return new ResponseDTO(200, user, "User found successfully");
            } else {
                return new ResponseDTO(404, null, "User not found");
            }
        }
        if (page != null && limit != null) {
            userOutput.setPage(page);
            Pageable pageable = new PageRequest(page - 1, limit);
            userOutput.setListResult(userService.findAll(pageable));
            userOutput.setTotalPage((int) Math.ceil((double) (userService.totalItem()) / limit));
        } else {
            userOutput.setListResult(userService.findAll());
        }

        if (!userOutput.getListResult().isEmpty()) {
            return new ResponseDTO(200, userOutput, "Users found successfully");
        } else {
            return new ResponseDTO(404, null, "No users found");
        }
    }



    @PostMapping(value = "/user")
    public ResponseDTO createUser(@RequestBody UserDTO model) {
        UserDTO userDTO = userService.save(model);
        if (userDTO != null) {
            return new ResponseDTO(200, userDTO, "User created successfully");
        } else {
            return new ResponseDTO(500, null, "Failed to create user");
        }
    }

    @PutMapping("/user/{id}")
    public ResponseDTO updateUser(@RequestBody UserDTO model, @PathVariable("id") long id) {
        model.setId(id);
        UserDTO userDTO = userService.save(model);
        if (userDTO != null) {
            return new ResponseDTO(200, userDTO, "User updated successfully");
        } else {
            return new ResponseDTO(500, null, "Failed to update user");
        }
    }

    @DeleteMapping("/user/{id}")
    public ResponseDTO deleteUser(@PathVariable Long id) {
        UserDTO userDTO = userService.deactivateUser(id);
        if (userDTO == null) {
            return new ResponseDTO(404, null, "User not found");
        }

        return new ResponseDTO(200, userDTO, "User deactivated successfully");
    }

    @PutMapping("/user/profile")
    public ResponseDTO updateProfile(@RequestBody UserDTO model, @RequestParam(value = "userName") String userName) {
        // kiểm tra người dùng đã đăng nhập
        if (userName == null){
            return new ResponseDTO(500, null, "Người dùng chưa đăng nhập");
        }
        model.setUserName(userName);
        UserDTO userDTO = userService.save(model);
        if (userDTO != null) {
            return new ResponseDTO(200, userDTO, "User updated successfully");
        } else {
            return new ResponseDTO(500, null, "Failed to update user");
        }
    }
}