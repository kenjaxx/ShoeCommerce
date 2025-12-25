package com.example.shoecommerce.service;

import com.shoecommerce.dto.request.ProductRequest;
import com.shoecommerce.entity.Product;
import com.shoecommerce.entity.User;
import com.shoecommerce.exception.ResourceNotFoundException;
import com.shoecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }

    public Product createProduct(ProductRequest request, User seller) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());
        product.setBrand(request.getBrand());
        product.setSize(request.getSize());
        product.setColor(request.getColor());
        product.setImageUrl(request.getImageUrl());
        product.setSeller(seller);

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, ProductRequest request, User seller) {
        Product product = getProductById(id);

        // Check if the seller owns this product
        if (!product.getSeller().getId().equals(seller.getId())) {
            throw new RuntimeException("You don't have permission to update this product");
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());
        product.setBrand(request.getBrand());
        product.setSize(request.getSize());
        product.setColor(request.getColor());
        product.setImageUrl(request.getImageUrl());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id, User seller) {
        Product product = getProductById(id);

        // Check if the seller owns this product
        if (!product.getSeller().getId().equals(seller.getId())) {
            throw new RuntimeException("You don't have permission to delete this product");
        }

        productRepository.delete(product);
    }

    public List<Product> getSellerProducts(User seller) {
        return productRepository.findBySeller(seller);
    }
}