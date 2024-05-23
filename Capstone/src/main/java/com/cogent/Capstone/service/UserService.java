package com.cogent.Capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.Capstone.entity.User;
import com.cogent.Capstone.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	public User saveUser(User user)
	{
		User user1=userRepository.save(user);
		return user1;
	}
	public List<User> getUsers() {
		// TODO Auto-generated method stub
		List<User> users=userRepository.findAll();
		return users;
	}
	public User getUser(int id) {
		// TODO Auto-generated method stub
		Optional<User> user=userRepository.findById(id);
		return user.orElse(null);
	}
	
	public User updateUser(int id,User user) {
		// TODO Auto-generated method stub
		//userRepository.saveAndFlush(user);
		Optional<User> user1=userRepository.findById(id);
		User user2=user1.get();
		user2.setUsername(user.getUsername());
		user2.setPassword(user.getPassword());
		user2.setAddress(user.getAddress());
		user2.setEmail(user.getEmail());
		userRepository.flush();
		return user2;
		
	}
	public User deleteUser(int id) {
		// TODO Auto-generated method stub
		User user= userRepository.findById(id).get();
		userRepository.delete(user);
		 return user;
	}

}
