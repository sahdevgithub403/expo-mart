package com.trustmart.backend.repository;

import com.trustmart.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStatus(Product.ProductStatus status);

    List<Product> findByCategoryAndStatus(String category, Product.ProductStatus status);
}
