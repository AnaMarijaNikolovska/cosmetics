package com.emt.cosmetics.controller;

import com.emt.cosmetics.model.Account;
import com.emt.cosmetics.services.AccountService;
import com.emt.cosmetics.services.implementation.AccountServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<Account> allAccounts(){
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public Optional<Account>  oneAccount(@PathVariable Long id){
        return accountService.getOneAccount(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable Long id){
        accountService.deleteAccount(id);
    }

    @PostMapping
    public Account addAccount(@RequestBody Account account){
        return accountService.saveAccount(account);
    }

    @PutMapping("/{id}")
    public Account editAccount(@RequestBody Account account, @PathVariable String id){
        return  accountService.saveAccount(account);
    }
}
