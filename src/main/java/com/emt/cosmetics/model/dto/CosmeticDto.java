package com.emt.cosmetics.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class CosmeticDto {

    @NotBlank
    String name;

    String description;

    @NotNull
    Integer price;

    @NotNull
    Long categoryId;

    @NotNull
    String seller;
}
