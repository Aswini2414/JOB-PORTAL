package com.jobs.controllers;

import java.util.List;
import java.util.Map;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.jobs.entities.JobApplication;
import com.jobs.services.JobApplicationService;

@RestController
@RequestMapping("/job-applications")
@CrossOrigin
public class JobApplicationController {

	@Autowired
    private JobApplicationService jobApplicationService;
	
	@GetMapping("/employee/apply/{jobId}")
    public ResponseEntity<String> applyForJob(@PathVariable Integer jobId, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(jobApplicationService.applyForJob(jobId, token));
    }
	
	@GetMapping("/employee/my-applications/{id}")
	 public ResponseEntity<List<JobApplication>> getJobApplications(@RequestHeader("Authorization") String token,@PathVariable Integer id) {
		return ResponseEntity.ok(jobApplicationService.getJobApplications(token, id));
	}
	
	@GetMapping("/employee/jobs/{id}")
	public ResponseEntity<List<Job>> getJobsNotAppliedByEmployee(@PathVariable Integer id){
		return ResponseEntity.ok(jobApplicationService.getJobsNotAppliedByEmployee(id));
	}
	
	@GetMapping("/get-job-applications-by-employees/{id}")
	public ResponseEntity<List<ReqRes>> getApplicationsForEmployerJobsWithEmployeeNames(@RequestHeader("Authorization") String token,@PathVariable Integer id){
		return ResponseEntity.ok(jobApplicationService.getApplicationsForEmployerJobsWithEmployeeNames(id, token));
	}
	
	@PutMapping("/update-status/{id}")
	public ResponseEntity<String> updateJobAppStatus(@PathVariable Integer id, @RequestBody Map<String, String> requestBody){
		// Extract the status from the request body
        String status = requestBody.get("status");

        // Call the service to update the status
        String response = jobApplicationService.updateStatus(status, id);

        // Return a success response with HTTP 200 status
        return ResponseEntity.ok(response);
	}
}
