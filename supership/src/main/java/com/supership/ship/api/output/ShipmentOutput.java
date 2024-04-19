package com.supership.ship.api.output;

import com.supership.ship.dto.ShipmentDTO;
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
public class ShipmentOutput {
    private int page;
    private int totalPage;
    private List<ShipmentDTO> listResult = new ArrayList<>();
}
