package com.emt.cosmetics.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CategoryDto {

    @NotBlank
    String name;

    String description;

    @NotBlank
    String mainCategory;
}
