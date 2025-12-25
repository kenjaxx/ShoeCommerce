package com.example.shoecommerce.service;

import com.shoecommerce.entity.*;
import com.shoecommerce.exception.ResourceNotFoundException;
import com.shoecommerce.repository.OrderRepository;
import com.shoecommerce.repository.OrderItemRepository;
import com.shoecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;

    @Transactional
    public Order createOrder(User user, String shippingAddress, String paymentMethod) {
        Cart cart = cartService.getOrCreateCart(user);
        
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setBuyer(user);
        order.setShippingAddress(shippingAddress);
        order.setPaymentMethod(paymentMethod);
        order.setStatus(Order.OrderStatus.PENDING);
        order.setPaymentStatus(Order.PaymentStatus.PENDING);

        BigDecimal total = BigDecimal.ZERO;

        // Create order from cart items
        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            
            // Check stock
            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient stock for: " + product.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(product.getPrice());
            
            // Reduce stock
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            total = total.add(orderItem.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity())));
        }

        order.setTotalAmount(total);
        Order savedOrder = orderRepository.save(order);

        // Save order items
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItemRepository.save(orderItem);
        }

        // Clear cart
        cartService.clearCart(user);

        return orderRepository.findById(savedOrder.getId()).get();
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByBuyerOrderByCreatedAtDesc(user);
    }

    public Order getOrderById(Long orderId, User user) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        
        if (!order.getBuyer().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        return order;
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, User user, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        // Check if user is buyer or seller of items
        boolean isBuyer = order.getBuyer().getId().equals(user.getId());
        boolean isSeller = order.getItems().stream()
                .anyMatch(item -> item.getProduct().getSeller().getId().equals(user.getId()));

        if (!isBuyer && !isSeller) {
            throw new RuntimeException("Unauthorized");
        }

        order.setStatus(status);
        return orderRepository.save(order);
    }

    @Transactional
    public Order updatePaymentStatus(Long orderId, Order.PaymentStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        
        order.setPaymentStatus(status);
        return orderRepository.save(order);
    }

    public List<Order> getSellerOrders(User seller) {
        // Get orders containing products from this seller
        return orderRepository.findAll().stream()
                .filter(order -> order.getItems().stream()
                        .anyMatch(item -> item.getProduct().getSeller().getId().equals(seller.getId())))
                .toList();
    }
}