package com.example.controller;

import com.example.entity.Product;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/products")
public class ProductController {

    private static final Logger logger =
            LoggerFactory.getLogger(ProductController.class);

    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    // SAVE PRODUCT
    @PostMapping
    public Product saveProduct(@Valid @RequestBody Product product) {

        logger.info("Saving Product : {}", product.getName());

        return repository.save(product);
    }

    // GET ALL PRODUCTS WITH PAGINATION
    @GetMapping
    public Page<Product> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        logger.info(
                "Fetching Products Page : {} Size : {}",
                page,
                size
        );

        return repository.findAll(
                PageRequest.of(page, size)
        );
    }
    @GetMapping("/available")
    public List<Product> getAvailableProducts() {

        logger.info("Fetching Available Products");

        return repository.findAvailableProducts();
    }

    // GET PRODUCT BY ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {

        logger.info("Fetching Product Id : {}", id);

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found"));
    }

    // DELETE PRODUCT
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {

        logger.info("Deleting Product Id : {}", id);

        repository.deleteById(id);
    }
}