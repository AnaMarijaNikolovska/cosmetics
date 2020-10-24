package com.emt.cosmetics.services;


import com.emt.cosmetics.model.Category;
import com.emt.cosmetics.model.dto.CategoryDto;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAllCategory();

    List<Category> getAllByMainCategory(String mainCategory);

    Optional<Category> getOneCategory(Long id);

    Category saveCategory(CategoryDto categoryDto);

    Category editCategory(CategoryDto categoryDto, Long id);

    void deleteCategory(Long id);
}
