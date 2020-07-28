package com.emt.cosmetics.services;

import com.emt.cosmetics.model.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    public List<Account> getAllAccounts();
    public Optional<Account> getOneAccount(Long id);
    public Account saveAccount(Account account);
    public Account editAccount(Account account, Long id);
    public void deleteAccount(Long id);

}
