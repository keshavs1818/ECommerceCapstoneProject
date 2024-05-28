package com.cogent.Capstone.dto;

import com.cogent.Capstone.entity.Product;
import com.cogent.Capstone.entity.Sale;

public class ProductSaleResponse {
private Product product;
private Sale sale;
public Product getProduct() {
	return product;
}
public void setProduct(Product product) {
	this.product = product;
}
public Sale getSale() {
	return sale;
}
public void setSale(Sale sale) {
	this.sale = sale;
}
}
