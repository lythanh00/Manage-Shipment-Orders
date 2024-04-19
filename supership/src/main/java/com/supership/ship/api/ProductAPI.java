package com.supership.ship.api;

import com.supership.ship.api.output.ProductOutput;
import com.supership.ship.dto.ProductDTO;
import com.supership.ship.dto.ResponseDTO;
import com.supership.ship.dto.ShipmentDTO;
import com.supership.ship.service.IProductService;
import com.supership.ship.service.IShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
public class ProductAPI {
    @Autowired
    private IProductService productService;

    @Autowired
    private IShipmentService shipmentService;

    @GetMapping(value = "/product")
    public ResponseDTO showUser(@RequestParam(value = "page", required = false) Integer page,
                                @RequestParam(value = "limit", required = false) Integer limit,
                                @RequestParam(value = "trackingNumber", required = false) String trackingNumber) {
        // if
        // findRoleByUserName
        // middleware kiểm tra user có đúng role không
        // đoạn code phân quyền
        ProductOutput productOutput = new ProductOutput();
        if (trackingNumber != null) {
            // Tìm kiếm product theo trackingNumber (mã shipment) shipment
            List<ProductDTO> productDTOs = new ArrayList<>();
            ShipmentDTO shipmentDTO = shipmentService.findShipmentByTrackingNumber(trackingNumber);
            if (shipmentDTO == null){
                return new ResponseDTO(404, null, "Product not found");
            }
            productDTOs = productService.findAllProductByShipmentId(shipmentDTO.getId());
            if (productDTOs != null) {
                return new ResponseDTO(200, productDTOs, "Product found successfully");
            } else {
                return new ResponseDTO(404, null, "Product not found");
            }
        }
        if (page != null && limit != null) {
            productOutput.setPage(page);
            Pageable pageable = new PageRequest(page - 1, limit);
            productOutput.setListResult(productService.findAll(pageable));
            productOutput.setTotalPage((int) Math.ceil((double) (productService.totalItem()) / limit));
        } else {
            productOutput.setListResult(productService.findAll());
        }

        if (!productOutput.getListResult().isEmpty()) {
            return new ResponseDTO(200, productOutput, "Shipments found successfully");
        } else {
            return new ResponseDTO(404, null, "No shipments found");
        }
    }

    @PostMapping(value = "/product")
    public ResponseDTO createProduct(@RequestBody ProductDTO model) {
        ProductDTO productDTO = productService.save(model);
        if (productDTO != null) {
            return new ResponseDTO(200, productDTO, "Tạo sản phẩm thành công");
        } else {
            return new ResponseDTO(500, null, "Tạo sản phẩm thất bại");
        }
    }

    @PutMapping(value = "/product/{id}")
    public ResponseDTO updateProduct(@RequestBody ProductDTO model, @PathVariable("id") long id) {
        model.setId(id);
        ProductDTO productDTO = productService.save(model);
        if (productDTO != null) {
            return new ResponseDTO(200, productDTO, "Thay đổi thông tin sản phẩm thành công");
        } else {
            return new ResponseDTO(500, null, "Thay đổi thông tin sản phẩm thất bại");
        }
    }

    @DeleteMapping(value = "/product")
    public ResponseDTO deleteShipment(@RequestBody long[] ids) {
        try {
            productService.delete(ids);
            return new ResponseDTO(200, null, "Xóa thông tin sản phẩm thành công");
        } catch (Exception e) {
            return new ResponseDTO(500, null, "Xóa thông tin sản phẩm thất bại");
        }
    }


}
