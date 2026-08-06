package com.example.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String message) {

        try {

            kafkaTemplate.send("cart-topic", message);

            System.out.println("Message Sent to Kafka : " + message);

        } catch (Exception e) {

            System.out.println("Kafka is not running.");
            e.printStackTrace();

        }
    }
}