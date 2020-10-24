package com.emt.cosmetics.services;

import com.emt.cosmetics.model.ShoppingCart;

import java.util.List;
import java.util.Optional;

public interface ShoppingCartService {
    List<ShoppingCart> getAllShoppingCarts();

    Optional<ShoppingCart> getOneShoppingCart(Long id);

    ShoppingCart saveShoppingCart(ShoppingCart shoppingCart);

    ShoppingCart getUserShoppingCart(String username);

    ShoppingCart editShoppingCart(String username, Long cosmeticId);

    void deleteShoppingCart(Long id);
}
