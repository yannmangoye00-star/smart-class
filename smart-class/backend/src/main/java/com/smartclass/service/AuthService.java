package com.smartclass.service;

import com.smartclass.dto.AuthRequest;
import com.smartclass.dto.AuthResponse;
import com.smartclass.dto.RegisterRequest;
import com.smartclass.entity.User;
import com.smartclass.exception.ApiException;
import com.smartclass.repository.UserRepository;
import com.smartclass.security.JwtService;

import java.time.Instant;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new ApiException("Email already registered");
        }

        Instant now = Instant.now();

        User user = new User();

        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(request.role());
        user.setEmailVerified(false);
        user.setEnabled(true);
        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        userRepository.save(user);

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getName(),
                user.getRole().name()
        );
    }

    public AuthResponse login(AuthRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(
                        () -> new ApiException("Invalid credentials")
                );

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getName(),
                user.getRole().name()
        );
    }
}