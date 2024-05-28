package com.cogent.Capstone.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.Capstone.dto.ProductSaleResponse;
import com.cogent.Capstone.dto.ProductStockResponse;
import com.cogent.Capstone.entity.Product;
import com.cogent.Capstone.entity.Sale;
import com.cogent.Capstone.entity.Stock;
import com.cogent.Capstone.proxy.SaleProxy;
import com.cogent.Capstone.proxy.StockProxy;
import com.cogent.Capstone.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	ProductRepository productRepository;
	@Autowired
	StockProxy stockProxy;
	@Autowired 
	SaleProxy saleProxy;
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
	public Product searchProduct(String name) {
		// TODO Auto-generated method stub
		Optional<Product> product=productRepository.findByName(name);
		
		return product.orElse(null);
	}
	public Product getProduct(int id) {
		// TODO Auto-generated method stub
		Optional<Product> product=productRepository.findById(id);
		
		return product.orElse(null);
	}
	
	public Product updateProduct(int id,Product product) {
		// TODO Auto-generated method stub
		//userRepository.saveAndFlush(user);
		Optional<Product> product1=productRepository.findById(id);
		Product product2=product1.get();
		product2.setName(product.getName());
		product2.setPrice(product.getPrice());
		
		productRepository.flush();
		return product2;
		
	}
	public Product deleteProduct(int id) {
		// TODO Auto-generated method stub
		Product product= productRepository.findById(id).get();
		productRepository.delete(product);
		 return product;
	}
	
	public ProductStockResponse getProductStock(int productId) {
		Product product= productRepository.findById(productId).get();
		
		Stock stock=stockProxy.getStockById(product.getStockId());
		ProductStockResponse responseDto= new ProductStockResponse();
		responseDto.setStock(stock);
		responseDto.setProduct(product);
		return responseDto;
	}
	public List<ProductStockResponse> getAllProductStocks() {
        // Fetch all products from the repository
        List<Product> products = productRepository.findAll();

        // For each product, fetch the corresponding stock and compile the response
        List<ProductStockResponse> productStockResponses = products.stream().map(product -> {
            Stock stock = stockProxy.getStockById(product.getStockId());
            ProductStockResponse responseDto = new ProductStockResponse();
            responseDto.setStock(stock);
            responseDto.setProduct(product);
            return responseDto;
        }).collect(Collectors.toList());

        return productStockResponses;
    }
	public ProductSaleResponse getProductSale(int productId) {
		Product product= productRepository.findById(productId).get();
		
		Sale sale=saleProxy.getSaleById(product.getSaleId());
		ProductSaleResponse responseDto= new ProductSaleResponse();
		responseDto.setSale(sale);
		responseDto.setProduct(product);
		return responseDto;
	}
	
	public List<ProductSaleResponse> getAllProductSales() {
        // Fetch all products from the repository
        List<Product> products = productRepository.findAll();

        // For each product, fetch the corresponding stock and compile the response
        List<ProductSaleResponse> productSaleResponses = products.stream().map(product -> {
           Sale sale = saleProxy.getSaleById(product.getSaleId());
            ProductSaleResponse responseDto = new ProductSaleResponse();
            responseDto.setSale(sale);
            responseDto.setProduct(product);
            return responseDto;
        }).collect(Collectors.toList());

        return productSaleResponses;
    }

}
