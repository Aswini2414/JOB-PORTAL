package com.jobs.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobs.entities.Job;
import com.jobs.repositories.JobRepository;

@Service
public class JobService {

	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private UserManagementClient userManagementClient;

	public Job createJob(String title, String description, String location, Double salary, String token) {
		UserDetailsResponse userDetails = userManagementClient.validateToken(token);
		System.out.println(userDetails);

		if (!"EMPLOYER".equals(userDetails.getRole())) {
			throw new RuntimeException("You are not authorized to create jobs");
		}

		Job job = new Job();
		job.setTitle(title);
		job.setDescription(description);
		job.setLocation(location);
		job.setSalary(salary);
		job.setEmployerId(userDetails.getId());

		return jobRepository.save(job);
	}

	// Get all jobs by employer
	public List<Job> getJobsByEmployer(Integer employerId) {
		return jobRepository.findByEmployerId(employerId);
	}
	
	public Job updateJob(Integer jobId, String title, String description, String location, Double salary, String token) {
        // Validate the token and check if the user is an employer
        UserDetailsResponse userDetails = userManagementClient.validateToken(token);

        if (!"EMPLOYER".equals(userDetails.getRole())) {
            throw new RuntimeException("You are not authorized to update jobs");
        }

        // Find the job by ID
        Optional<Job> jobOptional = jobRepository.findById(jobId);
        if (!jobOptional.isPresent()) {
            throw new RuntimeException("Job not found");
        }

        // Check if the employer trying to update the job is the one who posted it
        Job job = jobOptional.get();
        if (!job.getEmployerId().equals(userDetails.getId())) {
            throw new RuntimeException("You are not authorized to update this job");
        }

        // Update job details
        job.setTitle(title);
        job.setDescription(description);
        job.setLocation(location);
        job.setSalary(salary);

        // Save the updated job to the database
        return jobRepository.save(job);
    }
	
	// Delete job (Employer only)
    public String deleteJob(Integer jobId, String token) {
        UserDetailsResponse userDetails = userManagementClient.validateToken(token);

        if (!"EMPLOYER".equals(userDetails.getRole())) {
            throw new RuntimeException("You are not authorized to delete jobs");
        }

        Optional<Job> jobOptional = jobRepository.findById(jobId);
        if (!jobOptional.isPresent()) {
            throw new RuntimeException("Job not found");
        }

        Job job = jobOptional.get();
        if (!job.getEmployerId().equals(userDetails.getId())) {
            throw new RuntimeException("You are not authorized to delete this job");
        }

        jobRepository.delete(job);
        return "Job deleted successfully";
    }
    
 // Get job (Employer only)
    public Job getJob(Integer jobId, String token) {
        UserDetailsResponse userDetails = userManagementClient.validateToken(token);

        if (!"EMPLOYER".equals(userDetails.getRole())) {
            throw new RuntimeException("You are not authorized to get jobs");
        }

        Optional<Job> jobOptional = jobRepository.findById(jobId);
        if (!jobOptional.isPresent()) {
            throw new RuntimeException("Job not found");
        }

        Job job = jobOptional.get();
        if (!job.getEmployerId().equals(userDetails.getId())) {
            throw new RuntimeException("You are not authorized to delete this job");
        }

        return job;
    }

//    all jobs
    public List<Job> getAllJobs(){
    	return jobRepository.findAll();
    }
    
}
