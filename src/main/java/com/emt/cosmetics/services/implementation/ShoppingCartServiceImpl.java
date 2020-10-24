package com.emt.cosmetics.services.implementation;

import com.emt.cosmetics.model.Cosmetics;
import com.emt.cosmetics.model.ShoppingCart;
import com.emt.cosmetics.repository.ShoppingCartRepository;
import com.emt.cosmetics.services.CosmeticsService;
import com.emt.cosmetics.services.ShoppingCartService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final CosmeticsService cosmeticsService;

    public ShoppingCartServiceImpl(ShoppingCartRepository shoppingCartRepository, CosmeticsService cosmeticsService) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.cosmeticsService = cosmeticsService;
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
    public ShoppingCart getUserShoppingCart(String username) {
        return shoppingCartRepository.getByOwnerUsername(username);
    }

    @Override
    public ShoppingCart editShoppingCart(String username, Long cosmeticId) {
        ShoppingCart shoppingCart = getUserShoppingCart(username);

        Cosmetics cosmetics = cosmeticsService.getOneCosmetics(cosmeticId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Set<Cosmetics> shoppingCartCosmetics = shoppingCart.getCosmetics();

        if (shoppingCartCosmetics.contains(cosmetics)) {
            shoppingCartCosmetics.remove(cosmetics);
        } else {
            shoppingCartCosmetics.add(cosmetics);
        }

        shoppingCart.setCosmetics(shoppingCartCosmetics);
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public void deleteShoppingCart(Long id) {
        shoppingCartRepository.deleteById(id);
    }
}
