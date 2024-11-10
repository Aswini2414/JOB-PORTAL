package com.jobs.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import com.jobs.dto.ReqRes;
import com.jobs.entities.Job;
import com.jobs.entities.JobApplication;
import com.jobs.repositories.JobApplicationRepository;
import com.jobs.repositories.JobRepository;

@Service
public class JobApplicationService {

	@Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserManagementClient userManagementClient;
    
 // Apply for a job (Employee only)
    public String applyForJob(Integer jobId, String token) {
        UserDetailsResponse userDetails = userManagementClient.validateToken(token);

        if (!"EMPLOYEE".equals(userDetails.getRole())) {
            throw new RuntimeException("You are not authorized to apply for jobs");
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setEmployeeId(userDetails.getId());  // Assume username contains employee ID
        application.setStatus("PENDING");

        jobApplicationRepository.save(application);
        return "Job application submitted successfully!";
    }
    
    public List<JobApplication> getJobApplications(@RequestHeader("Authorization") String token,Integer id){
    	 UserDetailsResponse userDetails = userManagementClient.validateToken(token);

         // Check if the user has the EMPLOYEE role
         if (!"EMPLOYEE".equals(userDetails.getRole())) {
        	 throw new RuntimeException("You are not authorized to view jobs");
         }

         return jobApplicationRepository.findByEmployeeId(id);
    }
    
    public List<Job> getJobsNotAppliedByEmployee(Integer employeeId){
    	
    	List<Job> allJobs = jobRepository.findAll();
    	
    	List<JobApplication> applications = jobApplicationRepository.findByEmployeeId(employeeId);
    	
    	List<Integer> appliedJobIds = applications.stream().map(application->application.getJob().getId())
    			.collect(Collectors.toList());
    	
    	List<Job> jobsNotApplied = allJobs.stream().filter(job->!appliedJobIds.contains(job.getId()))
    								.collect(Collectors.toList());
    	return jobsNotApplied;
    	
    }
    
    public List<ReqRes> getApplicationsForEmployerJobsWithEmployeeNames(Integer employerId,String token){
    	UserDetailsResponse userDetails = userManagementClient.validateToken(token);

        if (!"EMPLOYER".equals(userDetails.getRole())) {
            throw new RuntimeException("You are not authorized to get job applications");
        }
        
     // Step 1: Fetch all jobs posted by this employer
        List<Job> employerJobs = jobRepository.findByEmployerId(employerId);
        
        
        // Step 2: Fetch all job applications for those jobs
        List<JobApplication> applications = jobApplicationRepository.findByJobIn(employerJobs);
        
     // Step 3: Extract employee IDs from applications
        List<Integer> employeeIds = applications.stream()
            .map(JobApplication::getEmployeeId)
            .collect(Collectors.toList());
        System.out.println(employeeIds);
        
        List<ReqRes> response = new ArrayList<>();
        
        try {
			List<UserDetailsResponse> employees = userManagementClient.getEmployeesByIds(token, employeeIds);
			
			Map<Integer, String> employeeIdToNameMap = employees.stream()
		            .collect(Collectors.toMap(UserDetailsResponse::getId, UserDetailsResponse::getName));
			
			response = applications.stream()
					.map(application -> {
						ReqRes reqRes = new ReqRes();
						reqRes.setId(application.getId());
						reqRes.setTitle(application.getJob().getTitle());
						reqRes.setDescription(application.getJob().getDescription());
						reqRes.setName(employeeIdToNameMap.get(application.getEmployeeId()));
						reqRes.setStatus(application.getStatus());
						return reqRes;
					}).collect(Collectors.toList());
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return response;
    }
    
    public String updateStatus(String status,Integer id) {
    	JobApplication appObj = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job application with ID " + id + " not found"));
    	appObj.setStatus(status);
    	jobApplicationRepository.save(appObj);
    	return "Status updated successfully";
    }
    
}
