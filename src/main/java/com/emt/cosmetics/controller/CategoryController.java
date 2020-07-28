package com.emt.cosmetics.controller;

import com.emt.cosmetics.model.Category;
import com.emt.cosmetics.services.implementation.CategoryServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryServiceImpl categoryService;

    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> allCategory(){
        return categoryService.getAllCategory();
    }

    @GetMapping("/{id}")
    public Optional<Category> oneCategory(@PathVariable Long id){
        return categoryService.getOneCategory(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
    }

    @PostMapping
    public Category addCategory(@RequestBody Category category){
        return categoryService.saveCategory(category);
    }

    @PutMapping("/{id}")
    public Category editCategory(@RequestBody Category category, @PathVariable Long id){
        return categoryService.saveCategory(category);
    }
}
