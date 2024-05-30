package com.cogent.Capstone.controller;

import java.io.InputStream;
import java.net.URI;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cogent.Capstone.entity.Stock;


import com.cogent.Capstone.service.StocksService;
import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StockController {
	@Autowired
	StocksService stockService;
	//http://localhost:8080/user
   // @RequestMapping(value="/user", method = RequestMethod.POST)//1st way
	//@RequestMapping("/user")
	
	@GetMapping("/stocks")
	public List<Stock> getAllStocks(){

	return stockService.getAllStocks();}
	@GetMapping("/stocks/{stockId}")
	public ResponseEntity<Stock> getStockById(@PathVariable int stockId)
	{
		
		Stock stock = stockService.getStockById(stockId);
		if(stock==null)
		
		throw new RuntimeException("ID: "+stockId+" Not Found"); 
		return ResponseEntity.status(HttpStatus.OK).body(stock);
	}
	@PostMapping("/stocks")
	public void saveDepartment (@RequestBody Stock stock)
	{
		stockService.saveStock(stock);
	}
				@PutMapping(value="/stocks/{stockId}")//id coming from path url is in string format
				//public User updateUser(@RequestBody User user)
				public Stock updateStock(@PathVariable int stockId,@RequestBody Stock stock)
				{
			    	Stock stock1=stockService.updateStock(stockId,stock);
			    	return stock1;
				}
				@PostMapping(value="/stocks/csv")
				public String uploadCSV(@RequestParam("file") MultipartFile file) throws Exception{
					List<Stock> stockList= new ArrayList<>();
					InputStream inputStream= file.getInputStream();
					CsvParserSettings setting = new CsvParserSettings();
					setting.setHeaderExtractionEnabled(true);
					CsvParser parser= new CsvParser(setting);
					List<Record> parseAllRecords = parser.parseAllRecords(inputStream);
					parseAllRecords.forEach(record->{
						Stock stock = new Stock();
						stock.setStockId(record.getInt("stockId"));
						stock.setStockAvailable(record.getInt("stockAvailable"));
						stockList.add(stock);
						stockService.saveStock(stock);
						
					});
					return "upload completed";}
}
