package com.supership.ship.api.output;

import com.supership.ship.dto.UserDTO;
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
public class UserOutput {
    private int page;
    private int totalPage;
    private List<UserDTO> listResult = new ArrayList<>();
}
