package com.example.service;

import com.example.client.ProductClient;
import com.example.dto.Product;
import com.example.entity.Cart;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository repo;
    private final ProductClient client;
    private final KafkaProducerService producerService;

    public CartService(CartRepository repo,
                       ProductClient client,
                       KafkaProducerService producerService) {

        this.repo = repo;
        this.client = client;
        this.producerService = producerService;
    }

    // SAVE CART ITEM
    public Cart save(Cart cart) {

        Product product =
                client.getProductById(
                        cart.getProductId()
                );

        System.out.println(
                "STOCK FROM PRODUCT SERVICE = "
                        + product.getStock()
        );

        if (product.getStock() <= 0) {

            throw new ResourceNotFoundException(
                    "Product Out Of Stock"
            );
        }

        Cart savedCart = repo.save(cart);

        producerService.sendMessage(
                "Product Added To Cart: " + cart.getProductId()
        );

        return savedCart;
    }

    // GET ALL CART ITEMS
    public List<Cart> getAll() {
        return repo.findAll();
    }

    // GET CART ITEM BY ID
    public Cart getCartById(Long id) {

        return repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart item not found"));
    }

    // DELETE CART ITEM
    public void delete(Long id) {
        repo.deleteById(id);
    }

    // CALL PRODUCT SERVICE
    public Product getProductById(int id) {
        return client.getProductById(id);
    }
}