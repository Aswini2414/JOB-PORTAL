package com.security.entities;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class OurUsers implements UserDetails{

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String name;
	private String email;
    private String password;
    private String role;
    
    
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role));
	}
	
	
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}


	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	 @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }


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


		public void setPassword(String password) {
			this.password = password;
		}


		@Override
		public String toString() {
			return "OurUsers [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", role="
					+ role + "]";
		}


		public OurUsers(Integer id, String name, String email, String password, String role) {
			super();
			this.id = id;
			this.name = name;
			this.email = email;
			this.password = password;
			this.role = role;
		}


		public OurUsers() {
			super();
			// TODO Auto-generated constructor stub
		}
	    
	    
		

}
