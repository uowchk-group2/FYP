package com.example.fypbackend.service;

import com.example.fypbackend.entity.User;

import java.util.List;

public interface UserServices {
    public List<User> findAll();

    public User findByID(int ID);

    public User findByUsername(String username);

    public List<User> findByRoleName(String role);

    public void save(User user);



}
