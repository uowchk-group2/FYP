package com.example.fypbackend.dao;

import com.example.fypbackend.entity.Order;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class OrderDAOService implements OrderDAO{

    private EntityManager entityManager;

    @Autowired
    public OrderDAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void newOrder(Order newOrder) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(newOrder);
    }

    @Override
    public List<Order> findAllByUserId(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Order> query = currentSession.createQuery( "from Order o " +
                "WHERE o.supplierId = '" + userId + "' OR o.distributorId = '" + userId + "'", Order.class);
        List<Order> resultList = query.getResultList();

        return resultList;
    }

    @Override
    public Order findByOrderId(int orderId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Order order = currentSession.get(Order.class, orderId);
        if (order == null){
            order = new Order();
        }
        return order;
    }
}
