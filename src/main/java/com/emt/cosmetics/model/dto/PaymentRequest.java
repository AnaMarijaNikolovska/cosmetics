package com.emt.cosmetics.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class PaymentRequest {
    String description;

    @NotBlank
    String stripeEmail;

    @NotBlank
    String stripeToken;

    String username;

    Integer amount;

    @NotNull
    Boolean isFromCart;
}
