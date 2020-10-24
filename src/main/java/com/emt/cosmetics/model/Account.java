package com.emt.cosmetics.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account implements UserDetails {
    @Id
    String username;

    String name;

    String surname;

    String password;

    String email;

    String country;

    String city;

    String streetName;

    Integer streetNumber;

    Integer zip;

    String phoneNumber;

    @OneToMany(orphanRemoval = true)
    Set<Cosmetics> cosmetics;

    @OneToOne(mappedBy = "owner", orphanRemoval = true)
    @JsonIgnore
    ShoppingCart shoppingCart;

    @Lob
    byte[] picture;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Account)) return false;
        Account account = (Account) o;
        return getUsername().equals(account.getUsername()) &&
                getName().equals(account.getName()) &&
                getSurname().equals(account.getSurname()) &&
                getPassword().equals(account.getPassword()) &&
                getEmail().equals(account.getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUsername(), getName(), getSurname(), getPassword(), getEmail());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}