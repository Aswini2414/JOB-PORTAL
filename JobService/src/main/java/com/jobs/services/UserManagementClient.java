package com.jobs.services;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="USERMANAGEMENT-SERVICE",url="http://localhost:8081")
public interface UserManagementClient {
	
	@GetMapping("/token/validate-token")
	public UserDetailsResponse validateToken(@RequestHeader("Authorization") String token);
	
	@GetMapping("/token/roles")
	public String getUserRoles(@RequestHeader("Authorization") String token);

	@GetMapping("/token/id-users")
	public List<UserDetailsResponse> getEmployeesByIds(@RequestHeader("Authorization") String token,@RequestParam List<Integer> employeeIds);
}
