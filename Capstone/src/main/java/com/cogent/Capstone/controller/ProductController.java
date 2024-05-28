package com.cogent.Capstone.controller;

import java.io.IOException;
import java.io.InputStream;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import com.cogent.Capstone.dto.ProductSaleResponse;
import com.cogent.Capstone.dto.ProductStockResponse;
import com.cogent.Capstone.entity.Product;
import com.cogent.Capstone.service.ProductService;

import jakarta.validation.Valid;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
	@Autowired
	ProductService productService;
	
	@PostMapping(value = "/product")
	public ResponseEntity<Product> createUser(@Valid @RequestBody Product product)//JsoN,Xml or other formats are converted as Model.
	{
    	Product product1=productService.saveProduct(product);
    	//http://localhost:8080/user/1
    	URI saved=ServletUriComponentsBuilder.fromCurrentRequest().path("/{name}").buildAndExpand(product1.getName()).toUri();
    	return ResponseEntity.created(saved).build();
	}
	
	//API for the GET Users
	//Resource URI->HTTP GET: http://localhost:8080/users
	//@GetMapping("/users")
	@GetMapping(value="/products" )
	public List<Product> getProducts()
	{
    	List<Product> products=productService.getProducts();
    	return products;
	}
	
	//API for the GET method to retrieve a specific user.
		//Resource URI->HTTP GET: http://localhost:8080/users/{id}->integer value
		//@GetMapping("/users/{id}")//id coming from path url is in string format
		
	    @GetMapping(value="/products/name/{name}" )//id coming from path url is in string format
		public ResponseEntity<Product> searchUser(@PathVariable String name)
		{
	    	Product product=productService.searchProduct(name);
	    	System.out.println(product);
	    	if(product==null)
	    		//throw new UserNotFoundException("ID:"+id+" Not Found");
	    		throw new RuntimeException("ID:"+name+" Not Found");
	    	return ResponseEntity.status(HttpStatus.OK).body(product);
	    	
		}
	    
	    @GetMapping(value="/products/id/{id}" )//id coming from path url is in string format
		public ResponseEntity<Product> getUser(@PathVariable int id)
		{
	    	Product product=productService.getProduct(id);
	    	System.out.println(product);
	    	if(product==null)
	    		//throw new UserNotFoundException("ID:"+id+" Not Found");
	    		throw new RuntimeException("ID:"+id+" Not Found");
	    	return ResponseEntity.status(HttpStatus.OK).body(product);
	    	
		}
		
		//API for the PUT method to update/replace a specific user.
				//Resource URI->HTTP PUT: http://localhost:8080/user->integer value
				//@GetMapping("/users/{id}")//id coming from path url is in string format
				@PutMapping(value="/products/{id}")//id coming from path url is in string format
				//public User updateUser(@RequestBody User user)
				public Product updateProduct(@PathVariable int id,@RequestBody Product product)
				{
			    	Product product1=productService.updateProduct(id,product);
			    	return product1;
				}
				@DeleteMapping(value="/products/{id}")//id coming from path url is in string format
				//public User updateUser(@RequestBody User user)
				public Product deleteProduct(@PathVariable int id)
				{
			    	Product product1=productService.deleteProduct(id);
			    	return product1;
				}
	@PostMapping(value="/product/csv")
	public String uploadCSV(@RequestParam("file") MultipartFile file) throws Exception{
		List<Product> productList= new ArrayList<>();
		InputStream inputStream= file.getInputStream();
		CsvParserSettings setting = new CsvParserSettings();
		setting.setHeaderExtractionEnabled(true);
		CsvParser parser= new CsvParser(setting);
		List<Record> parseAllRecords = parser.parseAllRecords(inputStream);
		parseAllRecords.forEach(record->{
			Product product = new Product();
			product.setId(record.getInt("id"));
			product.setName(record.getString("name"));
			product.setPrice(record.getDouble("price"));
			product.setCategory(record.getString("category"));
			product.setImageUrl(record.getString("imageUrl"));
			productList.add(product);
			productService.saveProduct(product);
			
		});
		return "upload completed";
	}
	 private final String uploadDir = "src/main/resources/static/uploads/";

	    @PostMapping("product/img")
	    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
	        if (file.isEmpty()) {
	            return ResponseEntity.badRequest().body("File is empty");
	        }

	        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
	        Path filePath = Paths.get(uploadDir + filename);
	        Files.copy(file.getInputStream(), filePath);

	        String imageUrl = "/uploads/" + filename;
	        System.out.println(imageUrl);
	        return ResponseEntity.ok(imageUrl);
	    }
	    
	    @GetMapping("/products/stocks/{id}")
	    public ProductStockResponse getProductStock(@PathVariable("id") int id) {
	    	return productService.getProductStock(id);
	    }
	    
	    @GetMapping("/products/sales/{id}")
	    public ProductSaleResponse getProductSale(@PathVariable("id") int id) {
	    	return productService.getProductSale(id);
	    }
}

