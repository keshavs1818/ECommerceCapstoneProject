package com.cogent.Capstone.service;

public class AuthResponse {
	private String userName;
	private String email;
	private String address;
	private String role;
	private String token;
	

	public AuthResponse(String userName, String email, String address, String role, String token) {
		super();
		this.userName = userName;
		this.email = email;
		this.address = address;
		this.role = role;
		this.token = token;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}

}
