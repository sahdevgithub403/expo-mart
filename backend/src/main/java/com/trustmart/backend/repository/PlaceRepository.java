package com.trustmart.backend.repository;

import com.trustmart.backend.entity.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    Page<Place> findByCategoryId(Long categoryId, Pageable pageable);
    
    // Haversine formula to calculate distance in miles
    // Earth radius in miles is approx 3959
    @Query(value = "SELECT p.*, " +
           "(3959 * acos(cos(radians(:lat)) * cos(radians(p.latitude)) * " +
           "cos(radians(p.longitude) - radians(:lng)) + " +
           "sin(radians(:lat)) * sin(radians(p.latitude)))) AS distance " +
           "FROM places p HAVING distance < :radius ORDER BY distance ASC",
           nativeQuery = true)
    List<Place> findNearbyPlaces(@Param("lat") double lat, @Param("lng") double lng, @Param("radius") double radius);

    @Query(value = "SELECT p.*, " +
           "(3959 * acos(cos(radians(:lat)) * cos(radians(p.latitude)) * " +
           "cos(radians(p.longitude) - radians(:lng)) + " +
           "sin(radians(:lat)) * sin(radians(p.latitude)))) AS distance " +
           "FROM places p WHERE p.category_id = :categoryId HAVING distance < :radius ORDER BY distance ASC",
           nativeQuery = true)
    List<Place> findNearbyPlacesByCategory(@Param("lat") double lat, @Param("lng") double lng, @Param("radius") double radius, @Param("categoryId") Long categoryId);

    Page<Place> findAllByOrderByRatingDescReviewCountDesc(Pageable pageable);
}
