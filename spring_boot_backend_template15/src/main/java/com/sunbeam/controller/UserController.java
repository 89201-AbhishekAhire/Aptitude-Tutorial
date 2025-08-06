package com.sunbeam.controller;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.UserDto;
import com.sunbeam.entities.User;
import com.sunbeam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // User Registration
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDto.UserResponse>> registerUser(@RequestBody UserDto.CreateUserRequest request) {
        try {
            // Check if user already exists
            if (userService.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("User with this email already exists", "USER_EXISTS"));
            }
            
            // Create new user
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword()); // In production, hash this password
            user.setRole(request.getRole());
            user.setIsActive(true);
            
            User savedUser = userService.save(user);
            
            // Convert to response DTO
            UserDto.UserResponse response = new UserDto.UserResponse(
                savedUser.getUserId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getCreatedAt(),
                savedUser.getIsActive()
            );
            
            return ResponseEntity.ok(ApiResponse.success("User registered successfully", response));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Registration failed: " + e.getMessage(), "REGISTRATION_ERROR"));
        }
    }
    
    // User Login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDto.LoginResponse>> login(@RequestBody UserDto.LoginRequest request) {
        try {
            Optional<User> userOpt = userService.findByEmailAndPassword(request.getEmail(), request.getPassword());
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                
                if (!user.getIsActive()) {
                    return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Account is deactivated", "ACCOUNT_DEACTIVATED"));
                }
                
                // Create login response (in production, generate JWT token here)
                UserDto.LoginResponse response = new UserDto.LoginResponse(
                    user.getUserId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    "jwt_token_here" // Replace with actual JWT token generation
                );
                
                return ResponseEntity.ok(ApiResponse.success("Login successful", response));
                
            } else {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid email or password", "INVALID_CREDENTIALS"));
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Login failed: " + e.getMessage(), "LOGIN_ERROR"));
        }
    }
    
    // Get all users (Admin only)
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDto.UserResponse>>> getAllUsers() {
        try {
            List<User> users = userService.findAll();
            
            List<UserDto.UserResponse> responses = users.stream()
                .map(user -> new UserDto.UserResponse(
                    user.getUserId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getCreatedAt(),
                    user.getIsActive()
                ))
                .toList();
            
            return ResponseEntity.ok(ApiResponse.success(responses));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get users: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
    
    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto.UserResponse>> getUserById(@PathVariable Long id) {
        try {
            Optional<User> userOpt = userService.findById(id);
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                UserDto.UserResponse response = new UserDto.UserResponse(
                    user.getUserId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getCreatedAt(),
                    user.getIsActive()
                );
                
                return ResponseEntity.ok(ApiResponse.success(response));
                
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get user: " + e.getMessage(), "USER_NOT_FOUND"));
        }
    }
    
    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto.UserResponse>> updateUser(
            @PathVariable Long id, 
            @RequestBody UserDto.UpdateUserRequest request) {
        try {
            Optional<User> userOpt = userService.findById(id);
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                
                if (request.getName() != null) {
                    user.setName(request.getName());
                }
                if (request.getEmail() != null) {
                    user.setEmail(request.getEmail());
                }
                if (request.getIsActive() != null) {
                    user.setIsActive(request.getIsActive());
                }
                
                User updatedUser = userService.save(user);
                
                UserDto.UserResponse response = new UserDto.UserResponse(
                    updatedUser.getUserId(),
                    updatedUser.getName(),
                    updatedUser.getEmail(),
                    updatedUser.getRole(),
                    updatedUser.getCreatedAt(),
                    updatedUser.getIsActive()
                );
                
                return ResponseEntity.ok(ApiResponse.success("User updated successfully", response));
                
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update user: " + e.getMessage(), "UPDATE_ERROR"));
        }
    }
    
    // Admin: Get all users by role
    @GetMapping("/role/{role}")
    public ResponseEntity<ApiResponse<List<UserDto.UserResponse>>> getUsersByRole(@PathVariable String role) {
        try {
            User.UserRole userRole = User.UserRole.valueOf(role.toUpperCase());
            List<User> users = userService.findByRole(userRole);
            
            List<UserDto.UserResponse> responses = users.stream()
                .map(user -> new UserDto.UserResponse(
                    user.getUserId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getCreatedAt(),
                    user.getIsActive()
                ))
                .toList();
            
            return ResponseEntity.ok(ApiResponse.success(responses));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get users: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
    
    // Admin: Get active users
    @GetMapping("/active/{isActive}")
    public ResponseEntity<ApiResponse<List<UserDto.UserResponse>>> getUsersByStatus(@PathVariable Boolean isActive) {
        try {
            List<User> users = userService.findByIsActive(isActive);
            
            List<UserDto.UserResponse> responses = users.stream()
                .map(user -> new UserDto.UserResponse(
                    user.getUserId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getCreatedAt(),
                    user.getIsActive()
                ))
                .toList();
            
            return ResponseEntity.ok(ApiResponse.success(responses));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to get users: " + e.getMessage(), "FETCH_ERROR"));
        }
    }
} 