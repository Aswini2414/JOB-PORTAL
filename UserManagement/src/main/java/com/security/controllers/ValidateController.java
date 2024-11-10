package com.security.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.security.dto.ReqRes;
import com.security.entities.OurUsers;
import com.security.repository.UsersRepo;
import com.security.services.JWTUtils;
import com.security.services.UsersManagementService;

@RestController
@CrossOrigin
@RequestMapping("/token")
public class ValidateController {

	@Autowired
	private JWTUtils jwtUtil;
	
	@Autowired
	private UsersRepo usersRepo;
	
	@Autowired
    private UsersManagementService usersManagementService;
	
	@GetMapping("/employer/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers(){
    	System.out.println("hi");
        return ResponseEntity.ok(usersManagementService.getAllUsers());

    }
    
    @GetMapping("/employer/get-users/{userId}")
    public ResponseEntity<ReqRes> getUSerByID(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.getUsersById(userId));

    }
    
    @PutMapping("/authorize/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody OurUsers reqres){
        return ResponseEntity.ok(usersManagementService.updateUser(userId, reqres));
    }

    @GetMapping("/validate-token")
    public ResponseEntity<ReqRes> validateToken(@RequestHeader("Authorization") String token){
    	String jwt = token.substring(7);  // Remove "Bearer " prefix
    	String username = jwtUtil.extractUsername(jwt);
        String role = jwtUtil.extractRole(jwt);  // Custom method to extract roles from JWT
        
        ReqRes response = new ReqRes();
        
        try {
        	OurUsers users = usersRepo.findByEmail(username).orElseThrow();
        	response.setId(users.getId());
        	response.setName(users.getName());
        	response.setEmail(users.getEmail());
        	response.setRole(users.getRole());
        	return ResponseEntity.ok(response);
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
    }
    
    @GetMapping("/roles")
    public ResponseEntity<String> getUserRoles(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);  // Remove "Bearer " prefix
            String role = jwtUtil.extractRole(jwt);  // Custom method to extract roles from JWT
            return ResponseEntity.ok(role);
    }
    
    @GetMapping("/id-users")
    public ResponseEntity<List<ReqRes>> getEmployeesByIds(@RequestParam List<Integer> employeeIds){
    	// Fetch employees by the list of IDs
        List<ReqRes> employees = usersManagementService.getEmployeeByIds(employeeIds);

        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    
}
