package com.example.shoecommerce.service;

import com.shoecommerce.entity.Cart;
import com.shoecommerce.entity.CartItem;
import com.shoecommerce.entity.Product;
import com.shoecommerce.entity.User;
import com.shoecommerce.exception.ResourceNotFoundException;
import com.shoecommerce.repository.CartRepository;
import com.shoecommerce.repository.CartItemRepository;
import com.shoecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }

    @Transactional
    public Cart addToCart(User user, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(user);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        // Check if item already in cart
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            cartItemRepository.save(newItem);
        }

        return cartRepository.findById(cart.getId()).get();
    }

    @Transactional
    public Cart updateCartItem(User user, Long itemId, Integer quantity) {
        Cart cart = getOrCreateCart(user);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        if (quantity <= 0) {
            cartItemRepository.delete(item);
        } else {
            if (item.getProduct().getStock() < quantity) {
                throw new RuntimeException("Insufficient stock");
            }
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        return cartRepository.findById(cart.getId()).get();
    }

    @Transactional
    public void removeFromCart(User user, Long itemId) {
        Cart cart = getOrCreateCart(user);
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        cartItemRepository.delete(item);
    }

    @Transactional
    public void clearCart(User user) {
        Cart cart = getOrCreateCart(user);
        cartItemRepository.deleteAll(cart.getItems());
    }

    public BigDecimal getCartTotal(Cart cart) {
        return cart.getItems().stream()
                .map(item -> item.getProduct().getPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}