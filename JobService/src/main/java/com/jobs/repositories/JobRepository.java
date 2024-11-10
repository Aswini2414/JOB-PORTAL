package com.jobs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobs.entities.Job;

public interface JobRepository extends JpaRepository<Job,Integer> {
	
	// Find all jobs by employer
    List<Job> findByEmployerId(Integer employerId);

}
