package com.jobs.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Job {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String title;
	private String description;
	private String location;
	private Double salary;
	private Integer employerId;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Double getSalary() {
		return salary;
	}
	public void setSalary(Double salary) {
		this.salary = salary;
	}
	public Integer getEmployerId() {
		return employerId;
	}
	public void setEmployerId(Integer employerId) {
		this.employerId = employerId;
	}
	@Override
	public String toString() {
		return "Job [id=" + id + ", title=" + title + ", description=" + description + ", location=" + location
				+ ", salary=" + salary + ", employerId=" + employerId + "]";
	}
	public Job(Integer id, String title, String description, String location, Double salary, Integer employerId) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.location = location;
		this.salary = salary;
		this.employerId = employerId;
	}
	public Job() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
