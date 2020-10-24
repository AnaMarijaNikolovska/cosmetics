package com.emt.cosmetics.services;

import com.emt.cosmetics.model.Account;
import com.emt.cosmetics.model.Cosmetics;
import com.emt.cosmetics.model.dto.CosmeticDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface CosmeticsService {
    List<Cosmetics> getAllCosmetics();

    List<Cosmetics> getAllByCategory(Long categoryId);

    List<Cosmetics> getAllByMainCategory(String mainCategory);

    List<Cosmetics> getAllBySeller(String username);

    Optional<Cosmetics> getOneCosmetics(Long id);

    Optional<Cosmetics> getByShoppingCartsIn(String username);

    Cosmetics saveCosmetics(CosmeticDto cosmeticDto, MultipartFile cosmeticPicture, Account account) throws IOException;

    Cosmetics editCosmetics(CosmeticDto cosmeticDto, MultipartFile cosmeticPicture, Long id) throws IOException;

    void deleteCosmetics(Long id);
}
