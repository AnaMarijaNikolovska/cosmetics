package com.emt.cosmetics.controller;


import com.emt.cosmetics.model.Account;
import com.emt.cosmetics.model.Cosmetics;
import com.emt.cosmetics.model.dto.CosmeticDto;
import com.emt.cosmetics.services.AccountService;
import com.emt.cosmetics.services.implementation.CosmeticsServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cosmetics")
public class CosmeticsController {
    private final CosmeticsServiceImpl cosmeticsService;
    private final AccountService accountService;


    public CosmeticsController(CosmeticsServiceImpl cosmeticsService, AccountService accountService) {
        this.cosmeticsService = cosmeticsService;
        this.accountService = accountService;
    }

    @GetMapping
    public List<Cosmetics> allCosmetics() {
        return cosmeticsService.getAllCosmetics();
    }

    @GetMapping("/{id}")
    public Optional<Cosmetics> oneCosmetic(@PathVariable Long id) {
        return cosmeticsService.getOneCosmetics(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCosmetics(@PathVariable Long id) {
        cosmeticsService.deleteCosmetics(id);
    }

    @PostMapping
    public Cosmetics addCosmetics(@RequestPart("cosmeticDto") @Valid CosmeticDto cosmeticDto, @RequestPart("cosmeticPicture") Optional<MultipartFile> cosmeticPicture) throws IOException {
        Account account = accountService.getOneAccount(cosmeticDto.getSeller())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return cosmeticsService.saveCosmetics(cosmeticDto, cosmeticPicture.orElse(null), account);
    }

    @PutMapping("/{id}")
    public Cosmetics editCosmetics(@RequestPart("cosmeticDto") @Valid CosmeticDto cosmeticDto, @RequestPart("cosmeticPicture") Optional<MultipartFile> cosmeticPicture, @PathVariable Long id) throws IOException {
        return cosmeticsService.editCosmetics(cosmeticDto, cosmeticPicture.orElse(null), id);
    }

    @GetMapping("/main-category/{name}")
    public List<Cosmetics> getAllByMainCategory(@PathVariable String name) {
        return cosmeticsService.getAllByMainCategory(name.toUpperCase());
    }

    @GetMapping("/category/{categoryId}")
    public List<Cosmetics> getAllByCategory(@PathVariable Long categoryId) {
        return cosmeticsService.getAllByCategory(categoryId);
    }
}

