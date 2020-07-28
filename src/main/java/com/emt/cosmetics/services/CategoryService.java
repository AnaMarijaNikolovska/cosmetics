package com.emt.cosmetics.services;


import com.emt.cosmetics.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    public List<Category> getAllCategory();
    public Optional<Category> getOneCategory(Long id);
    public Category saveCategory(Category category);
    public Category editCategory(Category category, Long id);
    public void deleteCategory(Long id);
}
