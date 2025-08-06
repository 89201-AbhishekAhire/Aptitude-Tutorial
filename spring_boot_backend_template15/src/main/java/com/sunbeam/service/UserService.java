package com.sunbeam.service;

import com.sunbeam.entities.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    List<User> findByRole(User.UserRole role);
    List<User> findByIsActive(Boolean isActive);
    List<User> findByRoleAndIsActive(User.UserRole role, Boolean isActive);
    List<User> findAll();
    User save(User user);
    Optional<User> findById(Long id);
    void deleteById(Long id);
}