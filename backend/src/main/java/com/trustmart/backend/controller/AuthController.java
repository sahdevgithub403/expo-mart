package com.trustmart.backend.controller;

import com.trustmart.backend.dto.AuthResponse;
import com.trustmart.backend.dto.FirebaseLoginRequest;
import com.trustmart.backend.dto.LoginRequest;
import com.trustmart.backend.dto.RegisterRequest;
import com.trustmart.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/firebase-login")
    public ResponseEntity<AuthResponse> firebaseLogin(@RequestBody FirebaseLoginRequest request) {
        return ResponseEntity.ok(authService.firebaseLogin(request));
    }
}
