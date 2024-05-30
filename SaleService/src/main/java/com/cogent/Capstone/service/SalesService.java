package com.cogent.Capstone.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.Capstone.entity.Sale;
import com.cogent.Capstone.repository.SalesRepository;

@Service
public class SalesService {
	@Autowired
	SalesRepository saleRepository;
	public Sale saveSale(Sale sale)
	{
		Sale sale1=saleRepository.save(sale);
		return sale1;
	}
	public List<Sale> getAllSales() {
		// TODO Auto-generated method stub
		List<Sale> sales=saleRepository.findAll();
		return sales;
	}
	public Sale getSaleById(int id) {
		// TODO Auto-generated method stub
		Optional<Sale> sale=saleRepository.findById(id);
		return sale.orElse(null);
	}
	
	public Sale updateStock(int id,Sale sale) {
		  Optional<Sale> optionalSale = saleRepository.findById(id);

		    if (optionalSale.isPresent()) {
		        Sale existingSale = optionalSale.get();

		        // Add new quantities to existing quantities
		        for (Integer quantity : sale.getQuantities()) {
		            existingSale.addQuantity(quantity);
		        }

		        // Add new dates to existing dates
		        for (Date date : sale.getDates()) {
		            existingSale.addDate(date);
		        }

		        // Save and flush the changes to the repository
		        saleRepository.saveAndFlush(existingSale);

		        return existingSale;
		    } else {
		        throw new RuntimeException("Sale not found with id: " + id);
		    }
	}

}
