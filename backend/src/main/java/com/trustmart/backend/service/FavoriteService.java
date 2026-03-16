package com.trustmart.backend.service;

import com.trustmart.backend.dto.FavoriteRequest;
import com.trustmart.backend.dto.PlaceResponse;
import com.trustmart.backend.entity.Favorite;
import com.trustmart.backend.entity.Place;
import com.trustmart.backend.entity.User;
import com.trustmart.backend.repository.FavoriteRepository;
import com.trustmart.backend.repository.PlaceRepository;
import com.trustmart.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, PlaceRepository placeRepository, UserRepository userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.placeRepository = placeRepository;
        this.userRepository = userRepository;
    }

    public void addFavorite(FavoriteRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Place place = placeRepository.findById(request.getPlaceId()).orElseThrow(() -> new RuntimeException("Place not found"));
        
        if (favoriteRepository.existsByUserIdAndPlaceId(user.getId(), place.getId())) {
            return; // already favorited
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setPlace(place);
        favoriteRepository.save(favorite);
    }

    public void removeFavorite(Long placeId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        
        favoriteRepository.findByUserIdAndPlaceId(user.getId(), placeId)
                .ifPresent(favoriteRepository::delete);
    }

    public List<PlaceResponse> getFavorites() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        
        return favoriteRepository.findByUserId(user.getId()).stream()
                .map(Favorite::getPlace)
                .map(p -> new PlaceResponse(
                        p.getId(),
                        p.getName(),
                        p.getCategory() != null ? p.getCategory().getName() : "",
                        p.getRating(),
                        p.getReviewCount(),
                        "",
                        p.getImageUrl(),
                        p.getCity() != null ? p.getCity().getName() : ""
                )).collect(Collectors.toList());
    }
}
