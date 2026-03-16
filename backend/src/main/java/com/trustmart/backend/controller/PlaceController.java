package com.trustmart.backend.controller;

import com.trustmart.backend.dto.PlaceResponse;
import com.trustmart.backend.service.PlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<PlaceResponse>> getNearbyPlaces(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "10.0") double radius) {
        return ResponseEntity.ok(placeService.getNearbyPlaces(lat, lng, radius));
    }

    @GetMapping("/top")
    public ResponseEntity<List<PlaceResponse>> getTopPlaces(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(placeService.getTopPlaces(page, size));
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<PlaceResponse>> getPlacesByCategory(
            @PathVariable Long id,
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "10.0") double radius) {
        return ResponseEntity.ok(placeService.getNearbyPlacesByCategory(lat, lng, radius, id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlaceResponse> getPlaceDetails(@PathVariable Long id) {
        return ResponseEntity.ok(placeService.getPlaceDetails(id));
    }
}
