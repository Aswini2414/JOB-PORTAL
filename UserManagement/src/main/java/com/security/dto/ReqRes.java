package com.security.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.security.entities.OurUsers;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown=true)
public class ReqRes {

	private int statusCode;
	private Integer id;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String role;
    private String email;
    private String password;
    private OurUsers ourUsers;
    private List<OurUsers> ourUsersList;
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getRefreshToken() {
		return refreshToken;
	}
	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
	public String getExpirationTime() {
		return expirationTime;
	}
	public void setExpirationTime(String expirationTime) {
		this.expirationTime = expirationTime;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public OurUsers getOurUsers() {
		return ourUsers;
	}
	public void setOurUsers(OurUsers ourUsers) {
		this.ourUsers = ourUsers;
	}
	public List<OurUsers> getOurUsersList() {
		return ourUsersList;
	}
	public void setOurUsersList(List<OurUsers> ourUsersList) {
		this.ourUsersList = ourUsersList;
	}
	@Override
	public String toString() {
		return "ReqRes [statusCode=" + statusCode + ", id=" + id + ", error=" + error + ", message=" + message
				+ ", token=" + token + ", refreshToken=" + refreshToken + ", expirationTime=" + expirationTime
				+ ", name=" + name + ", role=" + role + ", email=" + email + ", password=" + password + ", ourUsers="
				+ ourUsers + ", ourUsersList=" + ourUsersList + "]";
	}
	public ReqRes(int statusCode, Integer id, String error, String message, String token, String refreshToken,
			String expirationTime, String name, String role, String email, String password, OurUsers ourUsers,
			List<OurUsers> ourUsersList) {
		super();
		this.statusCode = statusCode;
		this.id = id;
		this.error = error;
		this.message = message;
		this.token = token;
		this.refreshToken = refreshToken;
		this.expirationTime = expirationTime;
		this.name = name;
		this.role = role;
		this.email = email;
		this.password = password;
		this.ourUsers = ourUsers;
		this.ourUsersList = ourUsersList;
	}
	public ReqRes() {
		super();
		// TODO Auto-generated constructor stub
	}
	
    
}
