package com.emt.cosmetics.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;
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

    String description;

    Integer price;

    @ManyToOne
    Account seller;

    @ManyToOne
    Category category;

    @ManyToMany
    @JsonIgnore
    Set<ShoppingCart> shoppingCarts;

    @Lob
    byte[] picture;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Cosmetics)) return false;
        Cosmetics cosmetics = (Cosmetics) o;
        return getId().equals(cosmetics.getId()) &&
                getName().equals(cosmetics.getName()) &&
                Objects.equals(getDescription(), cosmetics.getDescription()) &&
                getPrice().equals(cosmetics.getPrice());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getPrice());
    }
}
