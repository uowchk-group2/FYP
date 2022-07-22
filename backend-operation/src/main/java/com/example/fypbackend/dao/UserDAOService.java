package com.example.fypbackend.dao;

import com.example.fypbackend.entity.User;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class UserDAOService implements UserDAO {

    private EntityManager entityManager;

    @Autowired
    public UserDAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<User> findAll() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query query = currentSession.createQuery("FROM User", User.class);
        List<User> users = query.getResultList();
        return users;
    }

    @Override
    public User findByID(int ID) {
        Session currentSession = entityManager.unwrap(Session.class);
        User user = currentSession.get(User.class, ID);
        return user;
    }

    @Override
    public User findByUsername(String username) {
        Session currentSession = entityManager.unwrap(Session.class);
        String hql = "FROM User u WHERE u.username = '" + username + "'";
        Query query = currentSession.createQuery(hql, User.class);
        query.setMaxResults(1);
        User result = new User();

        try {
            Object result1 = query.getSingleResult();
            result = (User) result1;
        } catch (Exception e) {
            System.out.println("Exceiption: " + e.getMessage());
        }
        return result;
    }

    @Override
    public List<User> findByUserRole(String role) {
        Session currentSession = entityManager.unwrap(Session.class);
        String hql = "FROM User u WHERE u.role = '" + role + "'";
        Query query = currentSession.createQuery(hql, User.class);
        List<User> users = query.getResultList();

        return users;
    }

    @Override
    public void newUser(User user) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(user);
    }
}
