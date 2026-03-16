package com.trustmart.backend.dto;

public class PlaceResponse {
    private Long id;
    private String name;
    private String category;
    private Double rating;
    private Integer reviewCount;
    private String distance;
    private String imageUrl;
    private String city;

    public PlaceResponse(Long id, String name, String category, Double rating, Integer reviewCount, String distance, String imageUrl, String city) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.distance = distance;
        this.imageUrl = imageUrl;
        this.city = city;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    
    public String getDistance() { return distance; }
    public void setDistance(String distance) { this.distance = distance; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
}
