package com.supership.ship.service.impl;

import com.supership.ship.converter.UserConverter;
import com.supership.ship.dto.UserDTO;
//import com.supership.ship.entity.RoleEntity;
import com.supership.ship.entity.UserEntity;
import com.supership.ship.exception.UserException;
import com.supership.ship.hash.Hashing;
import com.supership.ship.repository.UserRepository;
import com.supership.ship.request.RegisterRequest;
import com.supership.ship.service.IUserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
@AllArgsConstructor
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConverter userConverter;

    @Autowired
    private Hashing hash;


    @Override
    public UserDTO save(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity();

        if (userDTO.getId() != null){ // update
            Optional<UserEntity> userEntityOptional = userRepository.findById(userDTO.getId());
            UserEntity oldUserEntity = userEntityOptional.orElse(null);
            if (oldUserEntity != null) {
                // bam password
                userDTO.setHashed_password(hash.hashPassword(userDTO.getPassword()));
                userEntity = userConverter.toEntity(userDTO, oldUserEntity);
            } else {
                // Xử lý tình huống khi không tìm thấy người dùng để cập nhật
                // (có thể làm gì đó tùy theo yêu cầu của bạn)
            }
        } else { // create
            userDTO.setIsActived(1);
            // bam password
            userDTO.setHashed_password(hash.hashPassword(userDTO.getPassword()));
            // userentity.id = userdto.role +  userdto.username
            userEntity = userConverter.toEntity(userDTO);
        }

        userEntity = userRepository.save(userEntity);

        return userConverter.toDTO(userEntity);
    }

    @Override
    public List<UserDTO> findAll(Pageable pageable) {
        List<UserDTO> results = new ArrayList<>();
        List<UserEntity> entities = userRepository.findAll(pageable).getContent();
        for (UserEntity item: entities){
            UserDTO userDTO = userConverter.toDTO(item);
            results.add(userDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) userRepository.count();
    }

    @Override
    public List<UserDTO> findAll() {
        List<UserDTO> results = new ArrayList<>();
        List<UserEntity> entities = userRepository.findAll();
        for (UserEntity item: entities){
            UserDTO userDTO = userConverter.toDTO(item);
            results.add(userDTO);
        }
        return results;
    }

    @Override
    public UserDTO findUserByUserName(String userName) {
        UserEntity userEntity = userRepository.findByUserName(userName);
        if (userEntity != null) {
            return userConverter.toDTO(userEntity);
        }
        return null; // Hoặc có thể ném một ngoại lệ nếu cần thiết
    }


    @Override
    @Transactional
    public UserDTO deactivateUser(Long id) {
        UserEntity userEntity = new UserEntity();
        Optional<UserEntity> userEntityOptional = userRepository.findById(id);
        userEntity = userEntityOptional.orElse(null);
        userEntity.setIsActived(0);
        userEntity = userRepository.save(userEntity);
        return userConverter.toDTO(userEntity);
    }

    @Override
    public UserDTO login(String userName, String password) {
        Optional<UserEntity> o_userEntity = Optional.ofNullable(userRepository.findByUserName(userName));
        //check
        UserDTO userDTONotification = new UserDTO();

        //check username
        if (!o_userEntity.isPresent()) {
            userDTONotification.setNotification("Tài khoản không tồn tại");
            return userDTONotification;
        }
        UserEntity userEntity = o_userEntity.get();
        // check isActived
        if (userEntity.getIsActived() == 0){
            userDTONotification.setNotification("Tài khoản chưa được kích hoạt");
            return userDTONotification;
        }
        //check password
        String storedPassword = userEntity.getPassword(); // Lấy mật khẩu đã lưu trữ
        if (hash.validatePassword(password, storedPassword)) {
            // Mật khẩu khớp, đăng nhập thành công
            // Trả về thông tin người dùng hoặc thực hiện các thao tác khác tùy theo yêu cầu của bạn
            return userConverter.toDTO(userEntity);
        } else{
            userDTONotification.setNotification("Mật khẩu không hợp lệ");
            return userDTONotification;
        }
    }

    @Override
    public UserDTO register(RegisterRequest registerRequest) {
        //check
        UserDTO userDTONotification = new UserDTO();
        // kiểm tra xem có giá trị không
        if (registerRequest.getUserName() == "" || registerRequest.getUserName() == null){
            userDTONotification.setNotification("Tài khoản không hợp lệ");
            return userDTONotification;
        }
        // Kiểm tra xem tên người dùng đã tồn tại chưa
        if (userRepository.existsByUserName(registerRequest.getUserName())) {
            userDTONotification.setNotification("Tài khoản đã tồn tại");
            return userDTONotification;
        }

        // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp nhau không
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            userDTONotification.setNotification("Mật khẩu không khớp");
            return userDTONotification;
        }

        // Tạo đối tượng UserEntity từ thông tin đăng ký
        UserEntity userEntity = new UserEntity();
        userEntity.setUserName(registerRequest.getUserName());
        userEntity.setFullName(registerRequest.getFullName());
        userEntity.setPhoneNumber(registerRequest.getPhoneNumber());
        userEntity.setIsActived(1); // Mặc định là không kích hoạt, người dùng cần xác nhận email để kích hoạt

        // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
        String hashedPassword = hash.hashPassword(registerRequest.getPassword());
        userEntity.setPassword(hashedPassword);

        // Lưu người dùng mới vào cơ sở dữ liệu
        userEntity = userRepository.save(userEntity);

        // Trả về thông tin người dùng đã đăng ký
        return userConverter.toDTO(userEntity);
    }

    @Override
    public String findRoleByUserName(String userName) {
        UserEntity userEntity = userRepository.findByUserName(userName);
        String role;
        if (userEntity != null) {
            role = userEntity.getRole();
            return role;
        }
        return null; // Hoặc có thể ném một ngoại lệ nếu cần thiết
    }

}
