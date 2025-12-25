package com.shoecommerce.controller;

import com.shoecommerce.dto.response.ApiResponse;
import com.shoecommerce.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        // Remove password before sending
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", user));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<User>> updateProfile(
            @RequestBody User updatedUser,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        
        // Update allowed fields
        if (updatedUser.getName() != null) {
            user.setName(updatedUser.getName());
        }
        if (updatedUser.getPhone() != null) {
            user.setPhone(updatedUser.getPhone());
        }
        if (updatedUser.getAddress() != null) {
            user.setAddress(updatedUser.getAddress());
        }
        
        // In a real app, save to database here
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", user));
    }
}