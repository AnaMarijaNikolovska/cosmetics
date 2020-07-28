package com.emt.cosmetics.repository;

import com.emt.cosmetics.model.Cosmetics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CosmeticsRepository extends JpaRepository<Cosmetics,Long> {
}
