package com.emt.cosmetics.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginDto {

    @NotBlank
    String username;

    @NotBlank
    String password;
}
