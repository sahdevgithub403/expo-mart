package com.trustmart.backend.service;

import com.trustmart.backend.dto.AuthResponse;
import com.trustmart.backend.dto.FirebaseLoginRequest;
import com.trustmart.backend.dto.LoginRequest;
import com.trustmart.backend.dto.RegisterRequest;
import com.trustmart.backend.model.User;
import com.trustmart.backend.repository.UserRepository;
import com.trustmart.backend.security.JwtUtil;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    // LEGACY: Keeping password-based registration for reference/testing as
    // requested
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(new HashSet<>(Collections.singletonList(User.Role.USER)));

        userRepository.save(user); // Save to DB

        // Auto-login after register
        String token = jwtUtil.generateToken(user.getPhone());

        return new AuthResponse(token, user.getName(), user.getPhone(), "USER");
    }

    // LEGACY: Keeping password-based login for reference/testing as requested
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getPhone(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generateToken(request.getPhone());

        User user = userRepository.findByPhone(request.getPhone()).orElseThrow();

        return new AuthResponse(token, user.getName(), user.getPhone(), user.getRoles().iterator().next().name());
    }

    // NEW: Firebase Phone verification based login
    public AuthResponse firebaseLogin(FirebaseLoginRequest request) {
        User user = userRepository.findByPhone(request.getPhone())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setPhone(request.getPhone());
                    newUser.setName(request.getName() != null ? request.getName()
                            : "User " + request.getPhone().substring(Math.max(0, request.getPhone().length() - 4)));
                    newUser.setEmail(request.getEmail());
                    newUser.setRoles(new HashSet<>(Collections.singletonList(User.Role.USER)));
                    newUser.setVerified(true);
                    return userRepository.save(newUser);
                });

        String token = jwtUtil.generateToken(user.getPhone());
        return new AuthResponse(token, user.getName(), user.getPhone(), user.getRoles().iterator().next().name());
    }
}
