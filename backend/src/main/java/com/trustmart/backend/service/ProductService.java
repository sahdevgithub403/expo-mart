package com.trustmart.backend.service;

import com.trustmart.backend.model.Product;
import com.trustmart.backend.model.User;
import com.trustmart.backend.repository.ProductRepository;
import com.trustmart.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findByStatus(Product.ProductStatus.AVAILABLE);
    }

    public Product addProduct(Product product, String email) {
        User seller = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        product.setSeller(seller);
        product.setStatus(Product.ProductStatus.AVAILABLE);
        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
