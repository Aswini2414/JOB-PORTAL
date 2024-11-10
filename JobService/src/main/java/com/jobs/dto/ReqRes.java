package com.jobs.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown=true)
public class ReqRes {
	private Integer id;
	private String title;
	private String description;
	private String location;
	private Double salary;
	private Integer employerId;
	private String name;
	private String status;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "ReqRes [id=" + id + ", title=" + title + ", description=" + description + ", location=" + location
				+ ", salary=" + salary + ", employerId=" + employerId + ", name=" + name + ", status=" + status + "]";
	}
	public ReqRes(Integer id, String title, String description, String location, Double salary, Integer employerId,
			String name, String status) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.location = location;
		this.salary = salary;
		this.employerId = employerId;
		this.name = name;
		this.status = status;
	}
	public ReqRes() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
