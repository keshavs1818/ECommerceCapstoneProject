package com.cogent.Capstone.controller;

import java.net.URI;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cogent.Capstone.entity.User;
import com.cogent.Capstone.exception.UserNotFoundException;
import com.cogent.Capstone.service.UserService;

import jakarta.validation.Valid;

@RestController
//@Controller
@Validated
public class UserController {
	@Autowired
	UserService userService;
	
	
	//http://localhost:8080/user
   // @RequestMapping(value="/user", method = RequestMethod.POST)//1st way
	//@RequestMapping("/user")
	
	//Post Mapping
	@PostMapping(value = "/createUser")//2nd way
	//@PostMapping(value = "/user",consumes = MediaType.APPLICATION_XML_VALUE)
	//@ResponseBody
	//public String createUser(@ModelAttribute User user)//@Model Attribute tells the container
	///Form data/Query Parameter can be preapared as Model
	public ResponseEntity<User> createUser(@RequestBody User user)//JsoN,Xml or other formats are converted as Model.
	{
    	User user1=userService.saveUser(user);
    	//http://localhost:8080/user/1
    	URI saved=ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user1.getId()).toUri();
    	return ResponseEntity.created(saved).build();
	}
	
	//API for the GET Users
	//Resource URI->HTTP GET: http://localhost:8080/users
	//@GetMapping("/users")
	@GetMapping(value="/users" )
	public List<User> getUsers()
	{
    	List<User> users=userService.getUsers();
    	return users;
	}
	
	//API for the GET method to retrieve a specific user.
		//Resource URI->HTTP GET: http://localhost:8080/users/{id}->integer value
		//@GetMapping("/users/{id}")//id coming from path url is in string format
		
	    @GetMapping(value="/users/{id}" )//id coming from path url is in string format
		public ResponseEntity<User> getUser(@PathVariable int id)
		{
	    	User user=userService.getUser(id);
	    	System.out.println(user);
	    	if(user==null)
	    		//throw new UserNotFoundException("ID:"+id+" Not Found");
	    		throw new RuntimeException("ID:"+id+" Not Found");
	    	return ResponseEntity.status(HttpStatus.OK).body(user);
	    	
		}
		
		//API for the PUT method to update/replace a specific user.
				//Resource URI->HTTP PUT: http://localhost:8080/user->integer value
				//@GetMapping("/users/{id}")//id coming from path url is in string format
				@PutMapping(value="/users/{id}")//id coming from path url is in string format
				//public User updateUser(@RequestBody User user)
		public User updateUser(@PathVariable int id,@RequestBody User user)
		{
	    	User user1=userService.updateUser(id,user);
	    	return user1;
		}
				
		@DeleteMapping(value="/users/{id}")//id coming from path url is in string format
		//public User updateUser(@RequestBody User user)
		public User deleteUser(@PathVariable int id)
		{
	    	User user1=userService.deleteUser(id);
	    	return user1;
		}
		
	    @GetMapping("/check-auth")
	    public String checkAuthentication() {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        if (authentication != null && authentication.isAuthenticated()) {
	            return "Authenticated as: " + authentication.getName();
	        } else {
	            return "Not authenticated";
	        }
	    }
}
