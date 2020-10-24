package com.emt.cosmetics.repository;

import com.emt.cosmetics.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Transactional
    List<Category> getAllByMainCategory(String mainCategory);
}
