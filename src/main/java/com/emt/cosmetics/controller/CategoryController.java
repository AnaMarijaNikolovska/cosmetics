package com.emt.cosmetics.controller;

import com.emt.cosmetics.model.Category;
import com.emt.cosmetics.model.dto.CategoryDto;
import com.emt.cosmetics.services.implementation.CategoryServiceImpl;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryServiceImpl categoryService;

    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> allCategory() {
        return categoryService.getAllCategory();
    }

    @GetMapping("/{id}")
    public Optional<Category> oneCategory(@PathVariable Long id) {
        return categoryService.getOneCategory(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }

    @PostMapping
    public Category addCategory(@RequestBody @Valid CategoryDto category) {
        return categoryService.saveCategory(category);
    }

    @PutMapping("/{id}")
    public Category editCategory(@RequestBody @Valid CategoryDto category, @PathVariable Long id) {
        return categoryService.editCategory(category, id);
    }

    @GetMapping("/main/{mainCategory}")
    public List<Category> getAllCategoriesByMainCategory(@PathVariable String mainCategory) {
        return categoryService.getAllByMainCategory(mainCategory);
    }
}
