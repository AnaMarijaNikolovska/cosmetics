package com.emt.cosmetics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String surname;

    String username;

    String password;

    String email;

    String country;

    String city;

    String streetName;

    Integer streetNumber;

    Integer zip;

    Long phoneNumber;

}