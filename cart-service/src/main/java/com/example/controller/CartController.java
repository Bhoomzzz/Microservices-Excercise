package com.example.controller;

import com.example.entity.Cart;
import com.example.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    // ADD TO CART
    @PostMapping
    public Cart addToCart(@RequestBody Cart cart) {
        return service.save(cart);
    }

    // GET ALL CART ITEMS
    @GetMapping
    public List<Cart> getCartItems() {
        return service.getAll();
    }

    // DELETE CART ITEM
    @DeleteMapping("/{id}")
    public void deleteCartItem(@PathVariable Long id) {
        service.delete(id);
    }
}