package com.trustmart.backend.dto;

public class AuthResponse {
    private String token;
    private String name;
    private String phone;
    private String role;

    public AuthResponse(String token, String name, String phone, String role) {
        this.token = token;
        this.name = name;
        this.phone = phone;
        this.role = role;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
