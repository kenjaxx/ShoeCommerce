package com.shoecommerce.controller;

import com.shoecommerce.dto.response.ApiResponse;
import com.shoecommerce.entity.User;
import com.shoecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

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
        try {
            User currentUser = (User) authentication.getPrincipal();
            User savedUser = userService.updateProfile(currentUser, updatedUser);
            
            // Remove password before sending
            savedUser.setPassword(null);
            return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", savedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}