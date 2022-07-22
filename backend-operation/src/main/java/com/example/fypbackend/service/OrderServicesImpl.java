package com.example.fypbackend.service;

import com.example.fypbackend.dao.OrderDAOService;
import com.example.fypbackend.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class OrderServicesImpl implements OrderServices{
    private OrderDAOService orderDAOService;

    @Autowired
    public OrderServicesImpl(OrderDAOService orderDAOService) {
        this.orderDAOService = orderDAOService;
    }

    @Override
    @Transactional
    public void newOrder(Order newOrder) {
        orderDAOService.newOrder(newOrder);
    }

    @Override
    @Transactional
    public List<Order> findAllByUserId(int userId) {
        return orderDAOService.findAllByUserId(userId);
    }

    @Override
    @Transactional
    public Order findByOrderId(int orderId) {
        return orderDAOService.findByOrderId(orderId);
    }
}
