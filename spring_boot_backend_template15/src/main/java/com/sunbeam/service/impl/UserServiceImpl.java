package com.sunbeam.service.impl;

import com.sunbeam.dao.UserDao;
import com.sunbeam.entities.User;
import com.sunbeam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public Optional<User> findByEmail(String email) {
        return userDao.findByEmail(email);
    }

    @Override
    public Optional<User> findByEmailAndPassword(String email, String password) {
        return userDao.findByEmailAndPassword(email, password);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userDao.existsByEmail(email);
    }

    @Override
    public List<User> findByRole(User.UserRole role) {
        return userDao.findByRole(role);
    }

    @Override
    public List<User> findByIsActive(Boolean isActive) {
        return userDao.findByIsActive(isActive);
    }

    @Override
    public List<User> findByRoleAndIsActive(User.UserRole role, Boolean isActive) {
        return userDao.findByRoleAndIsActive(role, isActive);
    }

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public User save(User user) {
        return userDao.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userDao.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        userDao.deleteById(id);
    }
}