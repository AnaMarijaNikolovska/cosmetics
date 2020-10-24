package com.emt.cosmetics.services;

import com.emt.cosmetics.model.dto.PaymentRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

public interface StripeService {
    Charge charge(PaymentRequest paymentRequest) throws StripeException;
}
