package com.emt.cosmetics.services;

import com.emt.cosmetics.model.ShoppingCart;

import java.util.List;
import java.util.Optional;

public interface ShoppingCartService {
    public List<ShoppingCart> getAllShoppingCarts();
    public Optional<ShoppingCart>  getOneShoppingCart(Long id);
    public ShoppingCart saveShoppingCart(ShoppingCart shoppingCart);
    public ShoppingCart editShoppingCart(ShoppingCart shoppingCart, Long id);
    public void deleteShoppingCart(Long id);
}
