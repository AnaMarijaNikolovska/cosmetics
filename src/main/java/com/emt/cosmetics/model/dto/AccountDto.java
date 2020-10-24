package com.emt.cosmetics.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AccountDto {
    @NotBlank
    String username;

    @NotBlank
    String name;

    @NotBlank
    String surname;

    @NotBlank
    String password;

    @NotBlank
    String email;

    String country;

    String city;

    String streetName;

    Integer streetNumber;

    Integer zip;

    String phoneNumber;
}
