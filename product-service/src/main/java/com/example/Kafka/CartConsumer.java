package com.example.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class CartConsumer {
    private static final Logger log = LoggerFactory.getLogger(CartConsumer.class);

    @KafkaListener(topics = "cart-topic", groupId = "product-group")
    public void consume(String message) {
        log.info("Kafka Event Received in Product Service: {}", message);
    }
}