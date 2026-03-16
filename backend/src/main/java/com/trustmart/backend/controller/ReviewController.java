package com.trustmart.backend.controller;

import com.trustmart.backend.dto.ReviewRequest;
import com.trustmart.backend.dto.ReviewResponse;
import com.trustmart.backend.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> addReview(@RequestBody ReviewRequest request) {
        return ResponseEntity.ok(reviewService.addReview(request));
    }

    @GetMapping("/{placeId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsForPlace(@PathVariable Long placeId) {
        return ResponseEntity.ok(reviewService.getReviewsForPlace(placeId));
    }
}
