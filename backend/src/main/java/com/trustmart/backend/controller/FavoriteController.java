package com.trustmart.backend.controller;

import com.trustmart.backend.dto.FavoriteRequest;
import com.trustmart.backend.dto.PlaceResponse;
import com.trustmart.backend.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    public ResponseEntity<String> addFavorite(@RequestBody FavoriteRequest request) {
        favoriteService.addFavorite(request);
        return ResponseEntity.ok("Added to favorites");
    }

    @DeleteMapping("/{placeId}")
    public ResponseEntity<String> removeFavorite(@PathVariable Long placeId) {
        favoriteService.removeFavorite(placeId);
        return ResponseEntity.ok("Removed from favorites");
    }

    @GetMapping
    public ResponseEntity<List<PlaceResponse>> getFavorites() {
        return ResponseEntity.ok(favoriteService.getFavorites());
    }
}
