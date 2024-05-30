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

import com.cogent.Capstone.entity.Sale;

import com.cogent.Capstone.service.SalesService;
import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SaleController {
	@Autowired
	SalesService saleService;
	//http://localhost:8080/user
   // @RequestMapping(value="/user", method = RequestMethod.POST)//1st way
	//@RequestMapping("/user")
	
	@GetMapping("/sales")
	public List<Sale> getAllStocks(){

	return saleService.getAllSales();}
	@GetMapping("/sales/{saleId}")
	public ResponseEntity<Sale> getSaleById(@PathVariable int saleId)
	{
		
		Sale sale = saleService.getSaleById(saleId);
		if(sale==null)
		
		throw new RuntimeException("ID: "+saleId+" Not Found"); 
		return ResponseEntity.status(HttpStatus.OK).body(sale);
	}
	@PostMapping("/sales")
	public void saveDepartment (@RequestBody Sale sale)
	{
		saleService.saveSale(sale);
	}
				@PutMapping(value="/sales/{saleId}")//id coming from path url is in string format
				//public User updateUser(@RequestBody User user)
				public Sale updateStock(@PathVariable int saleId,@RequestBody Sale stock)
				{
			    	Sale stock1=saleService.updateStock(saleId,stock);
			    	return stock1;
				}
				
				@PostMapping(value="/sales/csv")
				public String uploadCSV(@RequestParam("file") MultipartFile file) throws Exception{
					List<Sale> saleList= new ArrayList<>();
					InputStream inputStream= file.getInputStream();
					CsvParserSettings setting = new CsvParserSettings();
					setting.setHeaderExtractionEnabled(true);
					CsvParser parser= new CsvParser(setting);
					List<Record> parseAllRecords = parser.parseAllRecords(inputStream);
					parseAllRecords.forEach(record->{
						Sale sale = new Sale();
						sale.setSaleId(record.getInt("saleId"));
						
						saleService.saveSale(sale);
						
					});
					return "upload completed";}
}
