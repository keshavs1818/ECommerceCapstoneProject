package com.cogent.Capstone.configuration;


import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http.authorizeHttpRequests((requests) ->
	            requests
	                .requestMatchers("/admin/**").hasRole("ADMIN")
	                .requestMatchers("/users").hasAnyRole("USER", "ADMIN")
	                .requestMatchers("/authenticate").permitAll()
	                .requestMatchers("/createUser").permitAll()
	                .requestMatchers("/error").permitAll()
	                .anyRequest().authenticated())
	        .oauth2ResourceServer(oauth2 -> oauth2
	                .jwt(jwt -> jwt
	                        .jwtAuthenticationConverter(jwtAuthenticationConverter())));
	    http.formLogin();
	    http.httpBasic();
	    http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
	    http.csrf().disable();
	    return http.build();
	}
	
	private JwtAuthenticationConverter jwtAuthenticationConverter() {
	    JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
	    grantedAuthoritiesConverter.setAuthorityPrefix("");
	    grantedAuthoritiesConverter.setAuthoritiesClaimName("scope");

	    JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
	    jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
	    return jwtAuthenticationConverter;
	}
	
	
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
//	@Bean
//	@Autowired
//	public UserDetailsService userDetailService(DataSource dataSource) {
//		var admin=User.withUsername("chandrakant pandey").
//				password("{noop}chandra@123")
//				.roles("ADMIN")
//				.build();
//		
//		var user=User.withUsername("Ramesh").
//				password("{noop}ramesh@123")
//				.roles("USER")
//				.build();
//		var user1=User.withUsername("Ganesh").
//				password("{noop}ganesh@123")
//				.roles("USER")
//				.build();
//		var user3=User.withUsername("Suresh").
//				//password("{noop}mahesh@123")
//				password("suresh@123")
//				.passwordEncoder(str->passwordEncoder().encode(str))
//				.roles("USER","ADMIN")
//				.build();
//		
//		var jdbcDetailsManager=new JdbcUserDetailsManager(dataSource);
//		//jdbcDetailsManager.createUser(admin);
//		//jdbcDetailsManager.createUser(user);
//		//jdbcDetailsManager.createUser(user3);
//	   return jdbcDetailsManager;
//	   
//	}
	
	@Bean
	public KeyPair keypair() throws NoSuchAlgorithmException {
		var keyPairGenerator=KeyPairGenerator.getInstance("RSA");
		keyPairGenerator.initialize(2048);
		return keyPairGenerator.generateKeyPair();
		
	}
	
	@Bean
	public RSAKey rsaKey(KeyPair keyPair)
	{
		return new  RSAKey
				.Builder((RSAPublicKey)keyPair.getPublic())
				.privateKey(keyPair.getPrivate())
				.keyID(UUID.randomUUID().toString())
				.build();
	}
	
	@Bean
	public JWKSource<SecurityContext>jwkSource(RSAKey rsaKey)
	{
		var jwkSet=new JWKSet(rsaKey);
		return (JWKSelector,context)->JWKSelector.select(jwkSet);
	}
	
	
	@Bean
	public JwtDecoder jwtDecoder(RSAKey rsaKey)throws JOSEException
	{
		return NimbusJwtDecoder
				.withPublicKey(rsaKey.toRSAPublicKey())
				.build();
	}
	
	@Bean
	public JwtEncoder jwtEncoder(JWKSource<SecurityContext>jwkSource)throws JOSEException
	{
		return new NimbusJwtEncoder(jwkSource);			
	}
	

}
