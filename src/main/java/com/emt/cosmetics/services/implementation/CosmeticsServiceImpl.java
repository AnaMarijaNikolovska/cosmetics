package com.emt.cosmetics.services.implementation;

import com.emt.cosmetics.model.Category;
import com.emt.cosmetics.model.Cosmetics;
import com.emt.cosmetics.repository.CosmeticsRepository;
import com.emt.cosmetics.services.CategoryService;
import com.emt.cosmetics.services.CosmeticsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CosmeticsServiceImpl implements CosmeticsService {
    private final CosmeticsRepository cosmeticsRepository;

    public CosmeticsServiceImpl(CosmeticsRepository cosmeticsRepository) {
        this.cosmeticsRepository = cosmeticsRepository;
    }


    @Override
    public List<Cosmetics> getAllCosmetics() {
        return cosmeticsRepository.findAll();
    }

    @Override
    public Optional<Cosmetics> getOneCosmetics(Long id) {
        return cosmeticsRepository.findById(id);
    }

    @Override
    public Cosmetics saveCosmetics(Cosmetics cosmetics) {
        return cosmeticsRepository.save(cosmetics);
    }

    @Override
    public Cosmetics editCosmetics(Cosmetics cosmetics,Long id) {
        Optional<Cosmetics> product = getOneCosmetics(id);

        if(product.isPresent()){
            Cosmetics editproduct = product.get();
            editproduct.setCategory(cosmetics.getCategory());
            editproduct.setDescription(cosmetics.getDescription());
            editproduct.setName(cosmetics.getName());
            editproduct.setId(cosmetics.getId());
            editproduct.setPicture(cosmetics.getPicture());
            editproduct.setNumberOfAvailable(cosmetics.getNumberOfAvailable());
            editproduct.setPrice(cosmetics.getPrice());

            return cosmeticsRepository.save(editproduct);
        }
        return null;

    }

    @Override
    public void deleteCosmetics(Long id) {
        cosmeticsRepository.deleteById(id);

    }
}
