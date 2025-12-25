package com.example.shoecommerce.controller;

import com.shoecommerce.dto.response.ApiResponse;
import com.shoecommerce.entity.Order;
import com.shoecommerce.entity.User;
import com.shoecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<List<Order>>> getUserOrders(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<Order> orders = orderService.getUserOrders(user);
        return ResponseEntity.ok(ApiResponse.success("Orders retrieved", orders));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Order>> getOrderById(
            @PathVariable Long id,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();
            Order order = orderService.getOrderById(id, user);
            return ResponseEntity.ok(ApiResponse.success("Order found", order));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Order>> createOrder(
            @RequestBody Map<String, String> request,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();
            String shippingAddress = request.get("shippingAddress");
            String paymentMethod = request.get("paymentMethod");
            
            Order order = orderService.createOrder(user, shippingAddress, paymentMethod);
            return ResponseEntity.ok(ApiResponse.success("Order created", order));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Order>> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            Authentication authentication
    ) {
        try {
            User user = (User) authentication.getPrincipal();
            Order.OrderStatus status = Order.OrderStatus.valueOf(request.get("status"));
            
            Order order = orderService.updateOrderStatus(id, user, status);
            return ResponseEntity.ok(ApiResponse.success("Order status updated", order));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/seller")
    public ResponseEntity<ApiResponse<List<Order>>> getSellerOrders(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<Order> orders = orderService.getSellerOrders(user);
        return ResponseEntity.ok(ApiResponse.success("Seller orders retrieved", orders));
    }
}