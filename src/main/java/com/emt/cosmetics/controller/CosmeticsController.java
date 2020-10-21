package com.emt.cosmetics.controller;


import com.emt.cosmetics.model.Cosmetics;
import com.emt.cosmetics.services.implementation.CosmeticsServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cosmetics")
public class CosmeticsController {
    private final CosmeticsServiceImpl cosmeticsService;

    public CosmeticsController(CosmeticsServiceImpl cosmeticsService) {
        this.cosmeticsService = cosmeticsService;
    }

    @GetMapping
    public List<Cosmetics> allCosmetics(){
        return cosmeticsService.getAllCosmetics();
    }

    @GetMapping("/{id}")
    public Optional<Cosmetics> oneCosmetic(@PathVariable Long id){
        return cosmeticsService.getOneCosmetics(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCosmetics(@PathVariable Long id){
        cosmeticsService.deleteCosmetics(id);
    }

    @PostMapping
    public Cosmetics addCosmetics(@RequestBody Cosmetics cosmetics){
        return cosmeticsService.saveCosmetics(cosmetics);
    }

    @PutMapping("/{id}")
    public Cosmetics editCosmetics(@RequestBody Cosmetics cosmetics, @PathVariable Long id){
        return cosmeticsService.saveCosmetics(cosmetics);
    }
}

