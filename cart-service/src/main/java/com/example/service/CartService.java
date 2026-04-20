package com.example.service;

import com.example.entity.Cart;
import com.example.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository repository;

    public CartService(CartRepository repository) {
        this.repository = repository;
    }

    // ADD TO CART
    public Cart save(Cart cart) {
        return repository.save(cart);
    }

    // GET ALL CART ITEMS
    public List<Cart> getAll() {
        return repository.findAll();
    }

    // DELETE ITEM
    public void delete(Long id) {
        repository.deleteById(id);
    }
}