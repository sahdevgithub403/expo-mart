package com.trustmart.backend.service;

import com.trustmart.backend.dto.AuthResponse;
import com.trustmart.backend.dto.LoginRequest;
import com.trustmart.backend.dto.RegisterRequest;
import com.trustmart.backend.model.User;
import com.trustmart.backend.repository.UserRepository;
import com.trustmart.backend.security.JwtUtil;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(new HashSet<>(Collections.singletonList(User.Role.USER)));

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, user.getName(), user.getEmail(), "USER", user.getPhone(),
                user.getProfileImage());
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generateToken(request.getEmail());

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRoles().iterator().next().name(),
                user.getPhone(), user.getProfileImage());
    }

    public String forgotPassword(String email) {
        if (!userRepository.existsByEmail(email)) {
            throw new RuntimeException("User not found with this email");
        }
        return "Reset instructions sent to your email";
    }

    public String resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return "Password reset successful";
    }

    public AuthResponse updateProfile(Map<String, String> request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.containsKey("name"))
            user.setName(request.get("name"));
        if (request.containsKey("phone"))
            user.setPhone(request.get("phone"));
        if (request.containsKey("profileImage"))
            user.setProfileImage(request.get("profileImage"));

        userRepository.save(user);

        // Keep the token if it exists in the current session or generate a new one
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRoles().iterator().next().name(),
                user.getPhone(), user.getProfileImage());
    }

    public AuthResponse getProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(null, user.getName(), user.getEmail(), user.getRoles().iterator().next().name(),
                user.getPhone(), user.getProfileImage());
    }
}
