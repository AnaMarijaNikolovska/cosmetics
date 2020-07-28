package com.emt.cosmetics.services.implementation;

import com.emt.cosmetics.model.Category;
import com.emt.cosmetics.repository.CategoryRepository;
import com.emt.cosmetics.services.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getOneCategory(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category editCategory(Category category, Long id) {
        Optional<Category >editCategory = getOneCategory(id);

        if (editCategory.isPresent()){
            Category newCategory = editCategory.get();
            newCategory.setDescription(category.getDescription());
            newCategory.setId(category.getId());
            newCategory.setName(category.getName());

            return categoryRepository.save(newCategory);
        }
        return null;

    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
