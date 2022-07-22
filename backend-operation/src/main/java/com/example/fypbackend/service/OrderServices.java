package com.example.fypbackend.service;

import com.example.fypbackend.entity.Order;

import java.util.List;

public interface OrderServices {

    public void newOrder(Order newOrder);

    public List<Order> findAllByUserId(int userId);

    public Order findByOrderId(int orderId);

}
