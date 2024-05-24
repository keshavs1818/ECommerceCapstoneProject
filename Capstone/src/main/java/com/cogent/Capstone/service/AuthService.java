package com.cogent.Capstone.service;

import java.io.Console;
import java.time.Instant;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cogent.Capstone.entity.User;


@RestController
public class AuthService {

    private final JwtEncoder jwtEncoder;

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    @Autowired
    public AuthService(JwtEncoder jwtEncoder, AuthenticationManager authenticationManager, UserService userService) {
        this.jwtEncoder = jwtEncoder;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }
	
	@PostMapping("/authenticate")
	public ResponseEntity<AuthResponse> loginRequest(@RequestBody User loginUser) {
		try {
			System.out.print("this ran");
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));
			UserDetails userDetails = userService.loadUserByUsername(loginUser.getUsername());
			User user = userService.getUserByUsername(loginUser.getUsername());
			String token = createToken(authentication);
			// remove password from getting sent
			AuthResponse authResponse = new AuthResponse(user.getUsername(), user.getEmail(), user.getAddress(), user.getRole(),token);
			return ResponseEntity.ok(authResponse);
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	
    private String createToken(Authentication authentication) {
        Instant now = Instant.now();
        long expiry = 1L; // 1 hour

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(authentication.getName())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .claim("roles", authentication.getAuthorities().stream()
                        .map(grantedAuthority -> grantedAuthority.getAuthority())
                        .collect(Collectors.joining(",")))
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
