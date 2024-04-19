package com.supership.ship.api;

import com.supership.ship.dto.ResponseDTO;
import com.supership.ship.dto.UserProfileDTO;
import com.supership.ship.service.IUserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserProfileAPI {
    @Autowired
    private IUserProfileService userProfileService;

    @GetMapping(value = "/userprofile")
    public ResponseDTO showUserProfile(@RequestParam(value = "userName", required = false) String userName) {
        // Tìm kiếm người dùng theo tên
        UserProfileDTO userProfileDTO = userProfileService.findUserByUserName(userName);
        if (userProfileDTO != null) {
            return new ResponseDTO(200, userProfileDTO, "Lấy thông tin cá nhân thành công");
        } else {
            return new ResponseDTO(404, null, "Lấy thông tin cá nhân thất bại");
        }
    }

    @PutMapping("/userprofile")
    public ResponseDTO updateUserProfile(@RequestBody UserProfileDTO model) {
        UserProfileDTO userProfileDTO = userProfileService.save(model);
        if (userProfileDTO != null) {
            return new ResponseDTO(200, userProfileDTO, "Chỉnh sửa thông tin cá nhân thành công");
        } else {
            return new ResponseDTO(500, null, "Chỉnh sửa thông tin cá nhân thất bại");
        }
    }
}
