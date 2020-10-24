package com.emt.cosmetics.services.implementation;

import com.emt.cosmetics.model.Account;
import com.emt.cosmetics.model.Category;
import com.emt.cosmetics.model.Cosmetics;
import com.emt.cosmetics.model.dto.CosmeticDto;
import com.emt.cosmetics.model.enums.MainCategory;
import com.emt.cosmetics.repository.CosmeticsRepository;
import com.emt.cosmetics.services.CategoryService;
import com.emt.cosmetics.services.CosmeticsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CosmeticsServiceImpl implements CosmeticsService {
    private final CosmeticsRepository cosmeticsRepository;
    private final CategoryService categoryService;

    public CosmeticsServiceImpl(CosmeticsRepository cosmeticsRepository, CategoryService categoryService) {
        this.cosmeticsRepository = cosmeticsRepository;
        this.categoryService = categoryService;
    }

    @Override
    public List<Cosmetics> getAllCosmetics() {
        return cosmeticsRepository.findAll();
    }

    @Override
    public List<Cosmetics> getAllByCategory(Long categoryId) {
        return cosmeticsRepository.getByCategoryId(categoryId);
    }

    @Override
    public List<Cosmetics> getAllByMainCategory(String mainCategory) {
        MainCategory category = MainCategory.valueOf(mainCategory);
        return cosmeticsRepository.getByCategoryMainCategory(category);
    }

    @Override
    public List<Cosmetics> getAllBySeller(String username) {
        return cosmeticsRepository.getBySellerUsername(username);
    }

    @Override
    public Optional<Cosmetics> getOneCosmetics(Long id) {
        return cosmeticsRepository.findById(id);
    }

    @Override
    public Optional<Cosmetics> getByShoppingCartsIn(String username) {
        return Optional.empty();
    }

    @Override
    public Cosmetics saveCosmetics(CosmeticDto cosmeticDto, MultipartFile cosmeticPicture, Account account) throws IOException {
        Cosmetics cosmetics = new Cosmetics();
        cosmetics.setSeller(account);

        if (cosmeticPicture != null) {
            cosmetics.setPicture(cosmeticPicture.getBytes());
        }

        Optional<Category> optionalCategory = this.categoryService.getOneCategory(cosmeticDto.getCategoryId());
        optionalCategory.ifPresent(cosmetics::setCategory);
        mapDtoToEntity(cosmetics, cosmeticDto);

        return cosmeticsRepository.save(cosmetics);
    }

    @Override
    public Cosmetics editCosmetics(CosmeticDto cosmeticDto, MultipartFile cosmeticPicture, Long id) throws IOException {
        Optional<Cosmetics> product = getOneCosmetics(id);

        if (product.isPresent()) {

            Cosmetics cosmetics = product.get();
            if (cosmeticPicture != null) {
                cosmetics.setPicture(cosmeticPicture.getBytes());
            }

            Optional<Category> optionalCategory = this.categoryService.getOneCategory(cosmeticDto.getCategoryId());
            optionalCategory.ifPresent(cosmetics::setCategory);
            mapDtoToEntity(cosmetics, cosmeticDto);

            return cosmeticsRepository.save(cosmetics);
        }
        return null;
    }

    @Override
    public void deleteCosmetics(Long id) {
        cosmeticsRepository.deleteById(id);
    }

    private void mapDtoToEntity(Cosmetics cosmetics, CosmeticDto cosmeticDto) {
        cosmetics.setDescription(cosmeticDto.getDescription());
        cosmetics.setName(cosmeticDto.getName());
        cosmetics.setPrice(cosmeticDto.getPrice());
    }
}
