package com.trustmart.backend.service;

import com.trustmart.backend.dto.ReviewRequest;
import com.trustmart.backend.dto.ReviewResponse;
import com.trustmart.backend.entity.Place;
import com.trustmart.backend.entity.Review;
import com.trustmart.backend.entity.User;
import com.trustmart.backend.repository.PlaceRepository;
import com.trustmart.backend.repository.ReviewRepository;
import com.trustmart.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository, PlaceRepository placeRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.placeRepository = placeRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ReviewResponse addReview(ReviewRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Place place = placeRepository.findById(request.getPlaceId()).orElseThrow(() -> new RuntimeException("Place not found"));

        Review review = new Review();
        review.setUser(user);
        review.setPlace(place);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        review = reviewRepository.save(review);
        
        // Update place average rating and count
        List<Review> allReviews = reviewRepository.findByPlaceIdOrderByCreatedAtDesc(place.getId());
        double avg = allReviews.stream().mapToInt(Review::getRating).average().orElse(0.0);
        place.setRating(avg);
        place.setReviewCount(allReviews.size());
        placeRepository.save(place);

        return new ReviewResponse(
                review.getId(),
                review.getRating(),
                review.getComment(),
                user.getName(),
                user.getProfileImage(),
                review.getCreatedAt()
        );
    }

    public List<ReviewResponse> getReviewsForPlace(Long placeId) {
        return reviewRepository.findByPlaceIdOrderByCreatedAtDesc(placeId).stream()
                .map(r -> new ReviewResponse(
                        r.getId(),
                        r.getRating(),
                        r.getComment(),
                        r.getUser().getName(),
                        r.getUser().getProfileImage(),
                        r.getCreatedAt()
                )).collect(Collectors.toList());
    }
}
