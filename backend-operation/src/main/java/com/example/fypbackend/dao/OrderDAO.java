package com.example.fypbackend.dao;

import com.example.fypbackend.entity.Order;

import java.util.List;

public interface OrderDAO {

    public void newOrder(Order newOrder);

    public List<Order> findAllByUserId(int userId);

    public Order findByOrderId(int orderId);

}
