package com.supership.ship.api;

import com.supership.ship.api.output.ShipmentOutput;
import com.supership.ship.config.JpaAuditingConfig;
import com.supership.ship.dto.ResponseDTO;
import com.supership.ship.dto.ShipmentDTO;
import com.supership.ship.service.IShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
public class ShipmentAPI {
    @Autowired
    private IShipmentService shipmentService;

    @GetMapping(value = "/shipment/{role}")
    public ResponseDTO showUser(@RequestParam(value = "page", required = false) Integer page,
                                @RequestParam(value = "limit", required = false) Integer limit,
                                @RequestParam(value = "trackingNumber", required = false) String trackingNumber,
                                @PathVariable String role) {
        // if
        // findRoleByUserName
        // middleware kiểm tra user có đúng role không
        // đoạn code phân quyền

        if (!role.equals("ADMIN")){
            return new ResponseDTO(404, null, "User not authenrization");
        }
        ShipmentOutput shipmentOutput = new ShipmentOutput();
        if (trackingNumber != null) {
            // Tìm kiếm người dùng theo tên
            ShipmentDTO shipment = shipmentService.findShipmentByTrackingNumber(trackingNumber);
            if (shipment != null) {
                return new ResponseDTO(200, shipment, "Shipment found successfully");
            } else {
                return new ResponseDTO(404, null, "Shipment not found");
            }
        }
        if (page != null && limit != null) {
            shipmentOutput.setPage(page);
            Pageable pageable = new PageRequest(page - 1, limit);
            shipmentOutput.setListResult(shipmentService.findAll(pageable));
            shipmentOutput.setTotalPage((int) Math.ceil((double) (shipmentService.totalItem()) / limit));
        } else {
            shipmentOutput.setListResult(shipmentService.findAll());
        }

        if (!shipmentOutput.getListResult().isEmpty()) {
            return new ResponseDTO(200, shipmentOutput, "Shipments found successfully");
        } else {
            return new ResponseDTO(404, null, "No shipments found");
        }
    }

//    @PostMapping(value = "/shipment")
//    public ResponseDTO createShipment(@RequestHeader Map<String,String> headers, @RequestBody ShipmentDTO model) {
//        System.out.println(headers);
//        String str = headers.get("authorization");
//        String strUserName = "";
//        if (str != null && str.toLowerCase().startsWith("basic")) {
//            // Authorization: Basic base64credentials
//            String base64Credentials = str.substring("Basic".length()).trim();
//            byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
//            String credentials = new String(credDecoded, StandardCharsets.UTF_8);
//            final String[] values = credentials.split(":", 2);
//            strUserName = values[0];
//            String strPassWord = values[1];
//            System.out.println();
//        }
//        JpaAuditingConfig.AuditorAwareImpl a = new JpaAuditingConfig.AuditorAwareImpl();
//        Optional<String> b = a.getCurrentAuditor();
//        model.setCreatedBy(strUserName);
//        ShipmentDTO shipmentDTO = shipmentService.save(model);
//        if (shipmentDTO != null) {
//            return new ResponseDTO(200, shipmentDTO, "Tạo vận đơn thành công");
//        } else {
//            return new ResponseDTO(500, null, "Tạo vận đơn thất bại");
//        }
//    }

    @PostMapping(value = "/shipment")
    public ResponseDTO createShipment(@RequestBody ShipmentDTO model) {
        ShipmentDTO shipmentDTO = shipmentService.save(model);
        if (shipmentDTO != null) {
            return new ResponseDTO(200, shipmentDTO, "Tạo vận đơn thành công");
        } else {
            return new ResponseDTO(500, null, "Tạo vận đơn thất bại");
        }
    }

    @PutMapping("/shipment/{id}")
    public ResponseDTO updateShipment(@RequestBody ShipmentDTO model, @PathVariable("id") long id) {
        model.setId(id);
        ShipmentDTO shipmentDTO = shipmentService.save(model);
        if (shipmentDTO != null) {
            return new ResponseDTO(200, shipmentDTO, "Thay đổi thông tin vận đơn thành công");
        } else {
            return new ResponseDTO(500, null, "Thay đổi thông tin vận đơn thất bại");
        }
    }

    @DeleteMapping(value = "/shipment")
    public ResponseEntity<ResponseDTO> deleteShipment(@RequestBody long[] ids) {
        try {
            shipmentService.delete(ids);
            return new ResponseEntity<>(new ResponseDTO(200, null, "Xóa thông tin vận đơn thành công"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseDTO(500, null, "Xóa thông tin vận đơn thất bại"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/shipment/shipmentstatus/{shipmentId}")
    public ResponseDTO updateShipmentStatus(@RequestBody ShipmentDTO model,
                                            @PathVariable("shipmentId") long shipmentId) {

        ShipmentDTO updatedShipment = shipmentService.updateShipmentStatus(shipmentId, model.getShipmentStatusCode());
        if (updatedShipment != null){
            return new ResponseDTO(200, updatedShipment, "Thay đổi trạng thái vận đơn thành công");
        } else {
            return new ResponseDTO(500, null, "Thay đổi trạng thái vận đơn thất bại");
        }
    }

    @PutMapping("/shipment/driveruser/{shipmentId}")
    public ResponseDTO updateDriverUser(@RequestBody ShipmentDTO model,
                                                        @PathVariable("shipmentId") long shipmentId) {

        ShipmentDTO updatedShipment = shipmentService.updateDriverUser(shipmentId, model.getDriverUserId());
        if (updatedShipment != null){
            return new ResponseDTO(200, updatedShipment, "Nhận đơn thành công");
        } else {
            return new ResponseDTO(500, null, "Nhận đơn thất bại");
        }
    }

    @PutMapping("/shipment/workstore/{shipmentId}")
    public ResponseDTO updateWorkStore(@RequestBody ShipmentDTO model,
                                                        @PathVariable("shipmentId") long shipmentId) {

        ShipmentDTO updatedShipment = shipmentService.updateWorkStore(shipmentId, model.getWorkStoreCode());
        if (updatedShipment != null){
            return new ResponseDTO(200, updatedShipment, "Cập nhật kho trữ hàng thành công");
        } else {
            return new ResponseDTO(500, null, "Cập nhật kho trữ hàng thất bại");
        }
    }

    @GetMapping("/shipment/shop")
    public ResponseDTO getShipmentsByUser(@RequestParam(value = "userName") String userName) {
        // Gọi service để lấy danh sách vận đơn theo userName
        List<ShipmentDTO> shipments = shipmentService.getAllShipmentByCreatedBy(userName);

        ResponseDTO response = new ResponseDTO();
//        if (shipments.isEmpty()) {
//            response.setStatus(HttpStatus.NO_CONTENT.value());
//            response.setData(null);
//            response.setMessage("Không tìm thấy vận đơn cho userName: " + userName);
//        } else {
//            response.setStatus(HttpStatus.OK.value());
//            response.setData(shipments);
//            response.setMessage("Danh sách vận đơn cho userName: " + userName);
//        }
        if (shipments != null){
            return new ResponseDTO(200, shipments, "Lấy danh sách vận đơn thành công");
        } else {
            return new ResponseDTO(500, null, "Lấy danh sách vận đơn thất bại");
        }
    }

}
