package com.supership.ship.hash;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
public class MD5Hash implements Hashing {

    @Override
    public String hashPassword(String password) {
        try {
            // Tạo một đối tượng MessageDigest với thuật toán MD5
            MessageDigest md = MessageDigest.getInstance("MD5");

            // Cập nhật dữ liệu đầu vào bằng chuỗi password
            md.update(password.getBytes());

            // Băm dữ liệu và lấy giá trị hash dưới dạng một mảng byte
            byte[] byteData = md.digest();

            // Chuyển mảng byte thành một chuỗi hexademical
            StringBuilder hexString = new StringBuilder();
            for (byte b : byteData) {
                String hex = Integer.toHexString(0xFF & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            // Trả về chuỗi hex hash
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            // Xử lý lỗi nếu thuật toán MD5 không khả dụng
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean validatePassword(String originalPassword, String storedPassword) {
        // Băm mật khẩu gốc và so sánh với mật khẩu đã lưu
        String hashedOriginalPassword = hashPassword(originalPassword);
        return hashedOriginalPassword != null && hashedOriginalPassword.equals(storedPassword);
    }
}