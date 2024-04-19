package com.supership.ship.service.impl;

import com.supership.ship.converter.ShipmentConverter;
import com.supership.ship.dto.ShipmentDTO;
import com.supership.ship.entity.ShipmentEntity;
import com.supership.ship.repository.ShipmentRepository;
import com.supership.ship.repository.ShipmentStatusRepository;
import com.supership.ship.service.IShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService implements IShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private ShipmentStatusRepository shipmentStatusRepository;

    @Autowired
    private ShipmentConverter shipmentConverter;

    @Override
    public ShipmentDTO save(ShipmentDTO shipmentDTO) {
        ShipmentEntity shipmentEntity = new ShipmentEntity();
        if (shipmentDTO.getId() != null) { // update
            Optional<ShipmentEntity> shipmentEntityOptional = shipmentRepository.findById(shipmentDTO.getId());
            ShipmentEntity oldShipmentEntity = shipmentEntityOptional.orElse(null);
            if (oldShipmentEntity != null) {
                shipmentEntity = shipmentConverter.toEntity(shipmentDTO, oldShipmentEntity);
            } else {
                // Xử lý tình huống khi không tìm thấy người dùng để cập nhật
                // (có thể làm gì đó tùy theo yêu cầu của bạn)
            }
        }else { // create
            shipmentEntity = shipmentConverter.toEntity(shipmentDTO);
        }

        shipmentEntity = shipmentRepository.save(shipmentEntity);
        return shipmentConverter.toDTO(shipmentEntity);
    }

    @Override
    public void delete(long[] ids) {
        for (long id : ids) {
            shipmentRepository.deleteById(id); // Sử dụng phương thức deleteById
        }
    }

    @Override
    public List<ShipmentDTO> findAll(Pageable pageable) {
        List<ShipmentDTO> results = new ArrayList<>();
        List<ShipmentEntity> entities = shipmentRepository.findAll(pageable).getContent();
        for (ShipmentEntity item: entities){
            ShipmentDTO shipmentDTO = shipmentConverter.toDTO(item);
            results.add(shipmentDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) shipmentRepository.count();
    }

    @Override
    public List<ShipmentDTO> findAll() {
        List<ShipmentDTO> results = new ArrayList<>();
        List<ShipmentEntity> entities = shipmentRepository.findAll();
        for (ShipmentEntity item: entities){
            ShipmentDTO shipmentDTO = shipmentConverter.toDTO(item);
            results.add(shipmentDTO);
        }
        return results;
    }

    @Override
    public ShipmentDTO findShipmentByTrackingNumber(String trackingNumber) {
        ShipmentEntity shipmentEntity = shipmentRepository.findShipmentByTrackingNumber(trackingNumber);
        if (shipmentEntity != null) {
            return shipmentConverter.toDTO(shipmentEntity);
        }
        return null;
    }

    @Override
    public ShipmentDTO updateShipmentStatus(long shipmentId, String newStatus) {
        Optional<ShipmentEntity> shipmentEntityOptional = shipmentRepository.findById(shipmentId);
        if (shipmentEntityOptional.isPresent()) {
            ShipmentEntity shipmentEntity = shipmentEntityOptional.get();
            shipmentEntity.setShipmentStatusCode(newStatus); // Lưu trạng thái dưới dạng chuỗi
//            shipmentEntity.setModifiedBy("current_user"); // Đặt người sửa đổi, bạn cần lấy người dùng hiện tại ở đây
//            shipmentEntity.setModifiedDate(new Date()); // Đặt ngày sửa đổi
            shipmentRepository.save(shipmentEntity);

            return shipmentConverter.toDTO(shipmentEntity);
        } else {
            return null;
        }
    }

    @Override
    public ShipmentDTO updateDriverUser(long shipmentId, long driverUserId) {
        Optional<ShipmentEntity> shipmentEntityOptional = shipmentRepository.findById(shipmentId);
        if (shipmentEntityOptional.isPresent()) {
            ShipmentEntity shipmentEntity = shipmentEntityOptional.get();
            shipmentEntity.setDriverUserId(driverUserId); // Lưu id driver user
//            shipmentEntity.setModifiedBy("current_user"); // Đặt người sửa đổi, bạn cần lấy người dùng hiện tại ở đây
//            shipmentEntity.setModifiedDate(new Date()); // Đặt ngày sửa đổi
            shipmentRepository.save(shipmentEntity);

            return shipmentConverter.toDTO(shipmentEntity);
        } else {
            return null;
        }
    }

    @Override
    public ShipmentDTO updateWorkStore(long shipmentId, String workStore) {
        Optional<ShipmentEntity> shipmentEntityOptional = shipmentRepository.findById(shipmentId);
        if (shipmentEntityOptional.isPresent()) {
            ShipmentEntity shipmentEntity = shipmentEntityOptional.get();
            shipmentEntity.setWorkStoreCode(workStore); // Lưu kho
//            shipmentEntity.setModifiedBy("current_user"); // Đặt người sửa đổi, bạn cần lấy người dùng hiện tại ở đây
//            shipmentEntity.setModifiedDate(new Date()); // Đặt ngày sửa đổi
            shipmentRepository.save(shipmentEntity);

            return shipmentConverter.toDTO(shipmentEntity);
        } else {
            return null;
        }
    }

    @Override
    public List<ShipmentDTO> getAllShipmentByCreatedBy(String userName) {
        List<ShipmentDTO> shipmentDTOs = new ArrayList<>();
        List<ShipmentEntity> shipmentEntities = shipmentRepository.findAllShipmentByCreatedBy(userName);

        for (ShipmentEntity shipmentEntity : shipmentEntities) {
            shipmentDTOs.add(shipmentConverter.toDTO(shipmentEntity));
        }
        return shipmentDTOs;
    }


}
