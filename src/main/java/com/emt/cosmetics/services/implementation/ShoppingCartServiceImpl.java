package com.emt.cosmetics.services.implementation;

import com.emt.cosmetics.model.ShoppingCart;
import com.emt.cosmetics.repository.ShoppingCartRepository;
import com.emt.cosmetics.services.ShoppingCartService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;

    public ShoppingCartServiceImpl(ShoppingCartRepository shoppingCartRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
    }

    @Override
    public List<ShoppingCart> getAllShoppingCarts() {
        return shoppingCartRepository.findAll();
    }

    @Override
    public Optional<ShoppingCart> getOneShoppingCart(Long id) {
        return shoppingCartRepository.findById(id);
    }

    @Override
    public ShoppingCart saveShoppingCart(ShoppingCart shoppingCart) {
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart editShoppingCart(ShoppingCart shoppingCart, Long id) {
        Optional<ShoppingCart> editCart = getOneShoppingCart(id);
        if (editCart.isPresent()){
            ShoppingCart cart = editCart.get();
            cart.setId(shoppingCart.getId());
            cart.setUsesrname(shoppingCart.getUsesrname());
            cart.setCosmetics(shoppingCart.getCosmetics());

            return shoppingCartRepository.save(cart);
        }
        return null;

    }

    @Override
    public void deleteShoppingCart(Long id) {
        shoppingCartRepository.deleteById(id);

    }
}
