package com.emt.cosmetics.services;

import com.emt.cosmetics.model.Cosmetics;

import java.util.List;
import java.util.Optional;

public interface CosmeticsService {
    public List<Cosmetics> getAllCosmetics();
    public Optional<Cosmetics> getOneCosmetics(Long id);
    public Cosmetics saveCosmetics(Cosmetics cosmetics);
    public Cosmetics editCosmetics(Cosmetics cosmetics, Long id);
    public void deleteCosmetics(Long id);
}
