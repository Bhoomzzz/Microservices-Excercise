package com.example.service;

import com.example.entity.Product;
import com.example.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    // SAVE PRODUCT
    public Product save(Product product) {
        return repository.save(product);

    }

    // GET ALL PRODUCTS
    public List<Product> getAll() {
        return repository.findAll();
    }

    // GET PRODUCT BY ID
    public Product getProductById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // DELETE PRODUCT
    public void delete(Long id) {
        repository.deleteById(id);
    }
}