package com.jobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobs.entities.Job;
import com.jobs.entities.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {

	// Find all applications by an employee
    List<JobApplication> findByEmployeeId(Integer id);
    
    List<JobApplication> findByJobIn(List<Job> jobs);
}
