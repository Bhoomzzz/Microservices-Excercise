package com.example.controller;

import com.example.entity.Product;
import com.example.service.ProductService;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ✅ CREATE
    @PostMapping
    public Product save(@RequestBody Product product) {
        return productService.save(product);
    }

    // ✅ GET ALL
    @GetMapping("/all")
    public List<Product> getAll() {
        return productService.getAll();
    }

    // ✅ GET BY ID (🔥 THIS WAS MISSING)
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productService.getById(id);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }

    // ✅ PAGINATION
    @GetMapping
    public Page<Product> getProducts(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String sortBy) {

        return productService.getAllProducts(page, size, sortBy);
    }

    // ✅ FILTER
    @GetMapping("/expensive")
    public List<Product> getExpensiveProducts(@RequestParam double price) {
        return productService.getExpensiveProducts(price);
    }
}