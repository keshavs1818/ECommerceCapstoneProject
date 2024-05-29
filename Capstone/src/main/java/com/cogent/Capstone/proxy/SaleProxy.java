package com.cogent.Capstone.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cogent.Capstone.entity.Sale;

@FeignClient(name="SaleService",url="localhost:9005")
public interface SaleProxy {
	@GetMapping("/sales/{saleId}")
	public Sale getSaleById(@PathVariable int saleId);
}
