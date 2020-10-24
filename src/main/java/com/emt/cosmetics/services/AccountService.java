package com.emt.cosmetics.services;

import com.emt.cosmetics.model.Account;
import com.emt.cosmetics.model.dto.AccountDto;
import com.emt.cosmetics.model.dto.LoginDto;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface AccountService extends StripeService, UserDetailsService {

    List<Account> getAllAccounts();

    Optional<Account> getOneAccount(String username);

    Optional<Account> getAccountByUsernameAndPassword(LoginDto loginDto);

    Account saveAccount(AccountDto accountDto, MultipartFile accountPicture) throws IOException;

    Account editAccount(AccountDto accountDto, MultipartFile accountPicture, String username) throws IOException;

    void deleteAccount(String username);

}
