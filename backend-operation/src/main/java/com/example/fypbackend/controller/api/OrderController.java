package com.example.fypbackend.controller.api;

import com.example.fypbackend.entity.Order;
import com.example.fypbackend.service.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private OrderServices orderServices;

    @Autowired
    public OrderController(OrderServices orderServices) {
        this.orderServices = orderServices;
    }

    @PostMapping("/order")
    public Order newOrder(@RequestBody Order order){
        orderServices.newOrder(order);
        return order;
    }

    @GetMapping("/findByUserId/{userId}")
    public List<Order> findByUserId(@PathVariable int userId){
        return orderServices.findAllByUserId(userId);
    }

    @GetMapping("/{orderId}")
    public Order findByOrderId(@PathVariable int orderId){
        return orderServices.findByOrderId(orderId);
    }
}
