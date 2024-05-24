package com.cogent.Capstone.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cogent.Capstone.entity.Stock;

@FeignClient(name="StockService",url="localhost:9000")
public interface StockProxy {
	@GetMapping("/stocks/{stockId}")
	public Stock getStockById(@PathVariable int stockId);

}
