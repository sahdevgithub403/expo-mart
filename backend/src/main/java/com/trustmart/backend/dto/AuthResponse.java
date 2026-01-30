package com.trustmart.backend.dto;

public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private String role;
    private String phone;
    private String profileImage;

    public AuthResponse(String token, String name, String email, String role, String phone, String profileImage) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.profileImage = profileImage;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
