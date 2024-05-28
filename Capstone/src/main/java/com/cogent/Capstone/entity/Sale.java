package com.cogent.Capstone.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

public class Sale {
	private int saleId;
	private List<Integer> quantities = new ArrayList<>();
	private List<Date> dates = new ArrayList<>();
	public int getSaleId() {
		return saleId;
	}
	public void setSaleId(int saleId) {
		this.saleId = saleId;
	}
	public List<Integer> getQuantities() {
		return quantities;
	}
	public void setQuantities(List<Integer> quantities) {
		this.quantities = quantities;
	}
	public List<Date> getDates() {
		return dates;
	}
	public void setDates(List<Date> dates) {
		this.dates = dates;
	}
	public void addQuantity(int quantity) {
        this.quantities.add(quantity);
    }

    public void addDate(Date date) {
        this.dates.add(date);
    }
}
