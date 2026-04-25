package com.example.service;

import com.example.client.ProductClient;
import com.example.dto.Product;
import com.example.entity.Cart;
import com.example.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository repository;

    @Autowired
    private ProductClient productClient;

    // SAVE CART
    public Cart save(Cart cart) {
        return repository.save(cart);
    }

    // GET ALL CART ITEMS
    public List<Cart> getAll() {
        return repository.findAll();
    }


    public void delete(Long id) {
        repository.deleteById(id);
    }


    public Product getProductById(int productId) {
        return productClient.getProductById(productId);
    }
}