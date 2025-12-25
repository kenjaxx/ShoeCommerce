package com.shoecommerce.repository;

import com.shoecommerce.entity.Product;
import com.shoecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySeller(User seller);
    List<Product> findByCategory(String category);
    List<Product> findByNameContainingIgnoreCase(String name);
}