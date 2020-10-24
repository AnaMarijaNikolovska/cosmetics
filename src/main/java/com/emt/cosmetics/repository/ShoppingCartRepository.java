package com.emt.cosmetics.repository;

import com.emt.cosmetics.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    @Transactional
    ShoppingCart getByOwnerUsername(String username);
}
