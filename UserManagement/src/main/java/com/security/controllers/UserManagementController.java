package com.security.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.dto.ReqRes;
import com.security.entities.OurUsers;
import com.security.repository.UsersRepo;
import com.security.services.JWTUtils;
import com.security.services.UsersManagementService;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class UserManagementController {

	@Autowired
	private JWTUtils jwtUtil;
	
	@Autowired
	private UsersRepo usersRepo;
	
	@Autowired
    private UsersManagementService usersManagementService;
	
	@PostMapping("/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes reg){
        return ResponseEntity.ok(usersManagementService.register(reg));
    }

    @PostMapping("/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.login(req));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.refreshToken(req));
    }
    
    
}
