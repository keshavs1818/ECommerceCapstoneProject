package com.cogent.Capstone.controller;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cogent.Capstone.entity.User;
import com.cogent.Capstone.service.UserService;
//import com.cogent.Capstone.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
//    @Autowired
//    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtEncoder jwtEncoder;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    private UserService userService;
    
	@PostMapping("/authenticate")
	public JwtResponse authenticate(@RequestBody User loginUser) throws Exception {
		User actualUser;
		try {
//			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));
			actualUser = userService.getUser(loginUser.getUsername());
		
		} catch (Exception e) {
//			return new JwtResponse("Invalid login");
			throw new Exception("User not found");
		}
		
		if (!passwordEncoder.matches(loginUser.getPassword(), actualUser.getPassword())) {
			throw new Exception("Wrong login credentials");
		}
		
		return new JwtResponse(createToken(actualUser));
	}
	
	private String createToken(User user) {
		
		var claims=JwtClaimsSet.builder()
				.issuer("self")
				.issuedAt(Instant.now())
				.expiresAt(Instant.now().plusSeconds(60*30))
				.subject(user.getUsername())
				.claim("scope", user.getRole())
				.build();
		return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}
}

record JwtResponse(String token) {
	
}