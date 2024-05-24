package com.cogent.Capstone.dto;

import com.cogent.Capstone.entity.Product;
import com.cogent.Capstone.entity.Stock;

public class ProductStockResponse {
private Product product;
private Stock stock;

public Product getProduct() {
	return product;
}
public void setProduct(Product product) {
	this.product = product;
}
public Stock getStock() {
	return stock;
}
public void setStock(Stock stock) {
	this.stock = stock;
}

}
