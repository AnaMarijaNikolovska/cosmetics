package com.emt.cosmetics.model;

import com.emt.cosmetics.model.enums.MainCategory;
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
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String description;

    @Enumerated(value = EnumType.STRING)
    MainCategory mainCategory;

    @OneToMany
    Set<Cosmetics> cosmetics;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Category)) return false;
        Category category = (Category) o;
        return getId().equals(category.getId()) &&
                getName().equals(category.getName()) &&
                Objects.equals(getDescription(), category.getDescription()) &&
                getMainCategory() == category.getMainCategory();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getMainCategory());
    }
}
