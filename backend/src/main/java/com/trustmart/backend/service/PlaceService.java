package com.trustmart.backend.service;

import com.trustmart.backend.dto.PlaceResponse;
import com.trustmart.backend.entity.Place;
import com.trustmart.backend.repository.PlaceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceService {

    private final PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    public List<PlaceResponse> getNearbyPlaces(double lat, double lng, double radius) {
        List<Place> places = placeRepository.findNearbyPlaces(lat, lng, radius);
        return places.stream().map(p -> mapToResponse(p, calculateDistance(lat, lng, p.getLatitude(), p.getLongitude()))).collect(Collectors.toList());
    }

    public List<PlaceResponse> getNearbyPlacesByCategory(double lat, double lng, double radius, Long categoryId) {
        List<Place> places = placeRepository.findNearbyPlacesByCategory(lat, lng, radius, categoryId);
        return places.stream().map(p -> mapToResponse(p, calculateDistance(lat, lng, p.getLatitude(), p.getLongitude()))).collect(Collectors.toList());
    }

    public List<PlaceResponse> getTopPlaces(int page, int size) {
        Page<Place> places = placeRepository.findAllByOrderByRatingDescReviewCountDesc(PageRequest.of(page, size));
        return places.stream().map(p -> mapToResponse(p, "")).collect(Collectors.toList());
    }

    public PlaceResponse getPlaceDetails(Long id) {
        Place place = placeRepository.findById(id).orElseThrow(() -> new RuntimeException("Place not found"));
        return mapToResponse(place, "");
    }

    private PlaceResponse mapToResponse(Place p, String distanceStr) {
        String catName = p.getCategory() != null ? p.getCategory().getName() : "";
        String cityName = p.getCity() != null ? p.getCity().getName() : "";
        
        return new PlaceResponse(
                p.getId(),
                p.getName(),
                catName,
                p.getRating(),
                p.getReviewCount(),
                distanceStr,
                p.getImageUrl(),
                cityName
        );
    }

    private String calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        if (lat1 == 0 || lon1 == 0 || lat2 == 0 || lon2 == 0) return "";
        double theta = lon1 - lon2;
        double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) + 
                      Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
        dist = Math.acos(dist);
        dist = Math.toDegrees(dist);
        dist = dist * 60 * 1.1515; // default to miles
        return String.format("%.1f miles", dist);
    }
}
