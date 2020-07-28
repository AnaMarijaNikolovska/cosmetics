package com.emt.cosmetics.controller;

import com.emt.cosmetics.model.ShoppingCart;
import com.emt.cosmetics.services.implementation.ShoppingCartServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {
    private final ShoppingCartServiceImpl shoppingCartService;

    public ShoppingCartController(ShoppingCartServiceImpl shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping
    public List<ShoppingCart> allCarts(){
        return shoppingCartService.getAllShoppingCarts();
    }

    @GetMapping("/{id}")
    public Optional<ShoppingCart> oneCart(@PathVariable Long id){
        return shoppingCartService.getOneShoppingCart(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCart(@PathVariable Long id){
        shoppingCartService.deleteShoppingCart(id);
    }

    @PostMapping
    public ShoppingCart addCart(@RequestBody ShoppingCart shoppingCart){
        return shoppingCartService.saveShoppingCart(shoppingCart);
    }

    @PutMapping("/{id}")
    public ShoppingCart editCart(@RequestBody ShoppingCart shoppingCart, @PathVariable Long id){
        return shoppingCartService.saveShoppingCart(shoppingCart);
    }
}
