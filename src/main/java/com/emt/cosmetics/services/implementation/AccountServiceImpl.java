package com.emt.cosmetics.services.implementation;

import com.emt.cosmetics.model.Account;
import com.emt.cosmetics.repository.AccountRepository;
import com.emt.cosmetics.services.AccountService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;


    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Optional<Account>  getOneAccount(Long id) {
        return accountRepository.findById(id);
    }

    @Override
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account editAccount(Account account, Long id) {

        Optional<Account> editAccount = getOneAccount(id) ;
                if(editAccount.isPresent()){

                    Account account1 = editAccount.get();
                    account1.setName(account.getName());
                    account1.setPassword(account.getPassword());
                    account1.setUsername(account.getUsername());
                    account1.setSurname(account.getSurname());

                    return accountRepository.save(account1);
                }

                return null;

    }

    @Override
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);

    }
}
