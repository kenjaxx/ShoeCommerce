package com.shoecommerce.repository;

import com.shoecommerce.entity.Order;
import com.shoecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyer(User buyer);
    List<Order> findByBuyerOrderByCreatedAtDesc(User buyer);
}