package com.example.repository;

import com.example.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    @Query(
            value = "SELECT * FROM PRODUCT WHERE STOCK > 0",
            nativeQuery = true
    )
    List<Product> findAvailableProducts();
}