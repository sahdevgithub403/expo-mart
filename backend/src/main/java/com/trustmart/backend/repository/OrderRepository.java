package com.trustmart.backend.repository;

import com.trustmart.backend.model.Order;
import com.trustmart.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyer(User buyer);

    List<Order> findByProductSeller(User seller);
}
