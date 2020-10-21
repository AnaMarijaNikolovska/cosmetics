package com.emt.cosmetics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cosmetics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    Long numberOfAvailable;

    String description;

    Integer price;

    @OneToOne
    Category category;

    String picture;

    @ManyToMany
    Set<ShoppingCart> shoppingCarts;

}
