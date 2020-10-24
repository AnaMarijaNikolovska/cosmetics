package com.emt.cosmetics.repository;

import com.emt.cosmetics.model.Account;
import com.emt.cosmetics.model.Cosmetics;
import com.emt.cosmetics.model.ShoppingCart;
import com.emt.cosmetics.model.enums.MainCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface CosmeticsRepository extends JpaRepository<Cosmetics, Long> {

    @Transactional
    List<Cosmetics> getByCategoryId(Long categoryId);

    @Transactional
    List<Cosmetics> getBySellerUsername(String username);

    @Transactional
    List<Cosmetics> getByCategoryMainCategory(MainCategory mainCategory);
}
