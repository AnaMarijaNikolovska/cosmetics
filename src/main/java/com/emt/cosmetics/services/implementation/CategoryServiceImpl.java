package com.emt.cosmetics.services.implementation;

import com.emt.cosmetics.model.Category;
import com.emt.cosmetics.model.dto.CategoryDto;
import com.emt.cosmetics.model.enums.MainCategory;
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
    public List<Category> getAllByMainCategory(String mainCategory) {
        return categoryRepository.getAllByMainCategory(mainCategory);
    }

    @Override
    public Optional<Category> getOneCategory(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category saveCategory(CategoryDto categoryDto) {
        Category category = new Category();
        mapDtoToEntity(category, categoryDto);

        return categoryRepository.save(category);
    }

    @Override
    public Category editCategory(CategoryDto categoryDto, Long id) {
        Optional<Category> optionalCategory = getOneCategory(id);

        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            mapDtoToEntity(category, categoryDto);

            return categoryRepository.save(category);
        }
        return null;
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    private void mapDtoToEntity(Category category, CategoryDto categoryDto) {
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());

        MainCategory mainCategory = MainCategory.valueOf(categoryDto.getMainCategory());
        category.setMainCategory(mainCategory);
    }
}
