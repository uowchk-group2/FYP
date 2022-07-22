package com.example.fypbackend.dao;

import com.example.fypbackend.entity.User;

import java.util.List;

public interface UserDAO {

    public List<User> findAll();

    public User findByID(int ID);

    public User findByUsername(String username);

    public List<User> findByUserRole(String role);

    public void newUser(User user);

}
