package com.jobs.services;

public class UserDetailsResponse {
	
	private Integer id;
	private String name;
	private String email;
	private String role;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "UserDetailsResponse [id=" + id + ", name=" + name + ", email=" + email + ", role=" + role + "]";
	}
	public UserDetailsResponse(Integer id, String name, String email, String role) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.role = role;
	}
	public UserDetailsResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
