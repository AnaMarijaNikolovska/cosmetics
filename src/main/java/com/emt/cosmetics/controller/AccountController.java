package com.emt.cosmetics.controller;

import com.emt.cosmetics.model.Account;
import com.emt.cosmetics.model.ShoppingCart;
import com.emt.cosmetics.model.dto.AccountDto;
import com.emt.cosmetics.model.dto.LoginDto;
import com.emt.cosmetics.model.dto.PaymentRequest;
import com.emt.cosmetics.services.AccountService;
import com.emt.cosmetics.services.ShoppingCartService;
import com.emt.cosmetics.services.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class AccountController {
    private final AccountService accountService;
    private final StripeService stripeService;
    private final ShoppingCartService shoppingCartService;

    public AccountController(AccountService accountService, StripeService stripeService, ShoppingCartService shoppingCartService) {
        this.accountService = accountService;
        this.stripeService = stripeService;
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping
    public List<Account> allAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/{username}")
    public Optional<Account> oneAccount(@PathVariable String username) {
        return accountService.getOneAccount(username);
    }

    @PostMapping("/login")
    public Account loginUser(@RequestBody @Valid LoginDto loginDto) {
        return accountService.getAccountByUsernameAndPassword(loginDto).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{username}")
    public void deleteAccount(@PathVariable String username) {
        accountService.deleteAccount(username);
    }

    @PostMapping
    public Account addAccount(@RequestPart("accountDto") @Valid AccountDto accountDto, @RequestPart("accountPicture") Optional<MultipartFile> accountPicture) throws IOException {
        return accountService.saveAccount(accountDto, accountPicture.orElse(null));
    }

    @PutMapping("/{username}")
    public Account editAccount(@PathVariable String username, @RequestPart("accountDto") @Valid AccountDto accountDto, @RequestPart("accountPicture") Optional<MultipartFile> accountPicture) throws IOException {
        return accountService.editAccount(accountDto, accountPicture.orElse(null), username);
    }

    @PostMapping("/charge")
    public ResponseEntity<String> charge(@RequestBody @Valid PaymentRequest paymentRequest) throws StripeException {
        Charge charge = stripeService.charge(paymentRequest);
        if (charge.getId() != null) {
            return new ResponseEntity<String>(charge.getId(), HttpStatus.OK);
        }
        return new ResponseEntity<String>("Error occurred", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("{username}/shopping-cart")
    public ShoppingCart getShoppingCartByUsername(@PathVariable String username) {
        return shoppingCartService.getUserShoppingCart(username);
    }

    @PutMapping("{username}/shopping-cart")
    public ShoppingCart addRemoveCosmetic(@PathVariable String username, @RequestParam(name = "cosmeticId") Long cosmeticId) {
        return shoppingCartService.editShoppingCart(username, cosmeticId);
    }
}
