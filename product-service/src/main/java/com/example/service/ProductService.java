package com.example.service;

import com.example.entity.Product;
import com.example.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.*;

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

    // PAGINATION
    public Page<Product> getAllProducts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return repository.findAll(pageable);
    }


    public List<Product> getExpensiveProducts(double price) {
        return repository.findAll()
                .stream()
                .filter(product -> product.getPrice() > price)
                .toList();
    }
}