package com.example.service;

import com.example.entity.Cart;
import com.example.dto.Product;
import com.example.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    public Cart save(Cart cart) {
        return repository.save(cart);
    }

    public List<Cart> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Product getProductById(int productId) {
        String url = "http://localhost:8081/products/" + productId;
        return restTemplate.getForObject(url, Product.class);
    }
}