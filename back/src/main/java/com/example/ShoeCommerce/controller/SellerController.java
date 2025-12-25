package com.example.shoecommerce.controller;

import com.shoecommerce.dto.request.ProductRequest;
import com.shoecommerce.dto.response.ApiResponse;
import com.shoecommerce.entity.Product;
import com.shoecommerce.entity.User;
import com.shoecommerce.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seller")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SellerController {

    private final ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<ApiResponse<List<Product>>> getSellerProducts(Authentication authentication) {
        User seller = (User) authentication.getPrincipal();
        List<Product> products = productService.getSellerProducts(seller);
        return ResponseEntity.ok(ApiResponse.success("Products retrieved successfully", products));
    }

    @PostMapping("/products")
    public ResponseEntity<ApiResponse<Product>> createProduct(
            @Valid @RequestBody ProductRequest request,
            Authentication authentication
    ) {
        try {
            User seller = (User) authentication.getPrincipal();
            Product product = productService.createProduct(request, seller);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Product created successfully", product));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ApiResponse<Product>> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request,
            Authentication authentication
    ) {
        try {
            User seller = (User) authentication.getPrincipal();
            Product product = productService.updateProduct(id, request, seller);
            return ResponseEntity.ok(ApiResponse.success("Product updated successfully", product));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(
            @PathVariable Long id,
            Authentication authentication
    ) {
        try {
            User seller = (User) authentication.getPrincipal();
            productService.deleteProduct(id, seller);
            return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Object>> getDashboard(Authentication authentication) {
        User seller = (User) authentication.getPrincipal();
        List<Product> products = productService.getSellerProducts(seller);
        
        // Simple dashboard stats
        var stats = new Object() {
            public final int totalProducts = products.size();
            public final long activeProducts = products.stream().filter(p -> p.getStock() > 0).count();
            public final long outOfStock = products.stream().filter(p -> p.getStock() == 0).count();
        };
        
        return ResponseEntity.ok(ApiResponse.success("Dashboard data retrieved", stats));
    }
}