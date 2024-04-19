package com.supership.ship.api.output;

import com.supership.ship.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductOutput {
    private int page;
    private int totalPage;
    private List<ProductDTO> listResult = new ArrayList<>();
}
