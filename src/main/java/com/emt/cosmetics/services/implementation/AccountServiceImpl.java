package com.emt.cosmetics.services.implementation;

import com.emt.cosmetics.model.Account;
import com.emt.cosmetics.model.ShoppingCart;
import com.emt.cosmetics.model.dto.AccountDto;
import com.emt.cosmetics.model.dto.LoginDto;
import com.emt.cosmetics.model.dto.PaymentRequest;
import com.emt.cosmetics.repository.AccountRepository;
import com.emt.cosmetics.services.AccountService;
import com.emt.cosmetics.services.ShoppingCartService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final ShoppingCartService shoppingCartService;

    @Value("${stripe-sk}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }


    public AccountServiceImpl(AccountRepository accountRepository, ShoppingCartService shoppingCartService) {
        this.accountRepository = accountRepository;
        this.shoppingCartService = shoppingCartService;
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Optional<Account> getOneAccount(String username) {
        return accountRepository.findById(username);
    }

    @Override
    public Optional<Account> getAccountByUsernameAndPassword(LoginDto loginDto) {
        return accountRepository.getByUsernameAndPassword(loginDto.getUsername(), loginDto.getPassword());
    }

    @Override
    public Account saveAccount(AccountDto accountDto, MultipartFile accountPicture) throws IOException {
        Account account = new Account();

        if (accountPicture != null) {
            account.setPicture(accountPicture.getBytes());
        }
        mapDtoToEntity(account, accountDto);

        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setOwner(account);

        shoppingCartService.saveShoppingCart(shoppingCart);
        return accountRepository.save(account);
    }

    @Override
    public Account editAccount(AccountDto accountDto, MultipartFile accountPicture, String username) throws IOException {
        Optional<Account> optionalAccount = getOneAccount(username);

        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if (accountPicture != null) {
                account.setPicture(accountPicture.getBytes());
            }
            mapDtoToEntity(account, accountDto);

            return accountRepository.save(account);
        }
        return null;
    }

    @Override
    public void deleteAccount(String username) {
        accountRepository.deleteById(username);
    }

    @Override
    public Charge charge(PaymentRequest paymentRequest) throws StripeException {

        if (paymentRequest.getIsFromCart()) {
            ShoppingCart shoppingCart = shoppingCartService.getUserShoppingCart(paymentRequest.getUsername());
            shoppingCart.setCosmetics(null);

            shoppingCartService.saveShoppingCart(shoppingCart);
        }

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", paymentRequest.getAmount());
        chargeParams.put("currency", "EUR");
        chargeParams.put("description", paymentRequest.getDescription());
        chargeParams.put("source", paymentRequest.getStripeToken());

        return Charge.create(chargeParams);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return accountRepository.findById(s).orElseThrow(() -> new UsernameNotFoundException("username not found"));
    }

    private void mapDtoToEntity(Account account, AccountDto accountDto) {
        account.setName(accountDto.getName());
        account.setPassword(accountDto.getPassword());
        account.setUsername(accountDto.getUsername());
        account.setSurname(accountDto.getSurname());
        account.setEmail(accountDto.getEmail());
        account.setCountry(accountDto.getCountry());
        account.setCity(accountDto.getCity());
        account.setPhoneNumber(accountDto.getPhoneNumber());
        account.setStreetName(accountDto.getStreetName());
        account.setStreetNumber(accountDto.getStreetNumber());
        account.setZip(accountDto.getZip());
    }
}
