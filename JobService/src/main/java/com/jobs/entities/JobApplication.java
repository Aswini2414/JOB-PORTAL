package com.jobs.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class JobApplication {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "job_id", nullable = false)
	private Job job;
	
	private Integer employeeId; 
	
	private String status;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public Integer getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Integer integer) {
		this.employeeId = integer;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "JobApplication [id=" + id + ", job=" + job + ", employeeId=" + employeeId + ", status=" + status + "]";
	}

	public JobApplication(Integer id, Job job, Integer employeeId, String status) {
		super();
		this.id = id;
		this.job = job;
		this.employeeId = employeeId;
		this.status = status;
	}

	public JobApplication() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
