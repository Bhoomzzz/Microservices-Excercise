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

    // CREATE
    public Product save(Product product) {
        return repository.save(product);
    }

    // READ ALL
    public List<Product> getAll() {
        return repository.findAll();
    }

    // READ BY ID
    public Product getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // DELETE
    public void delete(Long id) {
        repository.deleteById(id);
    }
}