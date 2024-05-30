package com.cogent.Capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.Capstone.entity.Stock;
import com.cogent.Capstone.repository.StockRepository;

@Service
public class StocksService {
	@Autowired
	StockRepository stockRepository;
	public Stock saveStock(Stock stock)
	{
		Stock stock1=stockRepository.save(stock);
		return stock1;
	}
	public List<Stock> getAllStocks() {
		// TODO Auto-generated method stub
		List<Stock> stocks=stockRepository.findAll();
		return stocks;
	}
	public Stock getStockById(int id) {
		// TODO Auto-generated method stub
		Optional<Stock> stock=stockRepository.findById(id);
		return stock.orElse(null);
	}
	
	public Stock updateStock(int id,Stock stock) {
		// TODO Auto-generated method stub
		//userRepository.saveAndFlush(user);
		Optional<Stock> stock1=stockRepository.findById(id);
		Stock stock2=stock1.get();
		stock2.setStockAvailable(stock.getStockAvailable());
		stockRepository.flush();
		return stock2;
		
	}

}
