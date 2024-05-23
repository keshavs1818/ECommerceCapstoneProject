package com.cogent.Capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.Capstone.entity.Product;
import com.cogent.Capstone.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	ProductRepository productRepository;
	public Product saveProduct(Product product)
	{
		Product product1=productRepository.save(product);
		return product1;
	}
	public List<Product> getProducts() {
		// TODO Auto-generated method stub
		List<Product> products=productRepository.findAll();
		return products;
	}
	public Product getProduct(String name) {
		// TODO Auto-generated method stub
		Optional<Product> product=productRepository.findByName(name);
		
		return product.orElse(null);
	}
	
	public Product updateProduct(String name,Product product) {
		// TODO Auto-generated method stub
		//userRepository.saveAndFlush(user);
		Optional<Product> product1=productRepository.findByName(name);
		Product product2=product1.get();
		product2.setName(product.getName());
		product2.setPrice(product.getPrice());
		
		productRepository.flush();
		return product2;
		
	}
	public Product deleteProduct(String name) {
		// TODO Auto-generated method stub
		Product product= productRepository.findByName(name).get();
		productRepository.delete(product);
		 return product;
	}
	
	

}
