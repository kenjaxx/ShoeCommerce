package com.example.shoecommerce.controller;

import com.shoecommerce.dto.response.ApiResponse;
import com.shoecommerce.entity.Cart;
import com.shoecommerce.entity.User;
import com.shoecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<Cart>> getCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Cart cart = cartService.getOrCreateCart(user);
        return ResponseEntity.ok(ApiResponse.success("Cart retrieved", cart));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<Cart>> addToCart(
            @RequestBody Map<String, Object> request,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();
            Long productId = Long.valueOf(request.get("productId").toString());
            Integer quantity = Integer.valueOf(request.get("quantity").toString());
            
            Cart cart = cartService.addToCart(user, productId, quantity);
            return ResponseEntity.ok(ApiResponse.success("Item added to cart", cart));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<Cart>> updateCartItem(
            @PathVariable Long itemId,
            @RequestBody Map<String, Integer> request,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();
            Integer quantity = request.get("quantity");
            
            Cart cart = cartService.updateCartItem(user, itemId, quantity);
            return ResponseEntity.ok(ApiResponse.success("Cart updated", cart));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<Void>> removeFromCart(
            @PathVariable Long itemId,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();
            cartService.removeFromCart(user, itemId);
            return ResponseEntity.ok(ApiResponse.success("Item removed from cart", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse<Void>> clearCart(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            cartService.clearCart(user);
            return ResponseEntity.ok(ApiResponse.success("Cart cleared", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}