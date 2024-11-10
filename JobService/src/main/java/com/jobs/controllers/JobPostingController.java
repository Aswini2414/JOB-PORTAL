package com.jobs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.jobs.dto.ReqRes;
import com.jobs.entities.Job;
import com.jobs.services.JobService;
import com.jobs.services.UserDetailsResponse;

@RestController
@CrossOrigin
@RequestMapping("/job")
public class JobPostingController {

	@Autowired
	private JobService jobService;
	
	@PostMapping("/post-job")
	public ResponseEntity<Job> createJob(@RequestBody Job jobDetails,@RequestHeader("Authorization") String token ){
		return ResponseEntity.ok(jobService.createJob(jobDetails.getTitle(),jobDetails.getDescription(),jobDetails.getLocation(),jobDetails.getSalary(),token));
	}
	
	@GetMapping("/employer/my-jobs/{id}")
	public ResponseEntity<List<Job>> getJobsByEmployer(@RequestHeader("Authorization") String token,@PathVariable Integer id){
		return ResponseEntity.ok(jobService.getJobsByEmployer(id));
	}
	
	@DeleteMapping("/employer/delete/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Integer id, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(jobService.deleteJob(id, token));
    }
	
	@PutMapping("/employer/update/{id}")
	public ResponseEntity<Job> updateJob(@RequestBody Job jobDetails,@RequestHeader("Authorization") String token,@PathVariable Integer id){
		return ResponseEntity.ok(jobService.updateJob(id,jobDetails.getTitle(),jobDetails.getDescription(),jobDetails.getLocation(),jobDetails.getSalary(),token));
	}
	
	@GetMapping("/employer/get/{id}")
	public ResponseEntity<Job> getJob(@PathVariable Integer id,@RequestHeader("Authorization") String token){
		return ResponseEntity.ok(jobService.getJob(id, token));
	}
	
	@GetMapping("/all-jobs")
	public ResponseEntity<List<Job>> getAllJobs(){
		return ResponseEntity.ok(jobService.getAllJobs());
	}
	
	
}
