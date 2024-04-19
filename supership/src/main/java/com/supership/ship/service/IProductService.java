package com.supership.ship.service;

import com.supership.ship.dto.ProductDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IProductService {
    ProductDTO save(ProductDTO productDTO);
    void delete(long[] ids);
    List<ProductDTO> findAll(Pageable pageable);
    int totalItem();
    List<ProductDTO> findAll();
    List<ProductDTO> findAllProductByShipmentId(Long id);
}
