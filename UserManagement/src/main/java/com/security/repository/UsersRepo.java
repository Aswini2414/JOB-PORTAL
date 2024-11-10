package com.security.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.security.entities.OurUsers;

public interface UsersRepo extends JpaRepository<OurUsers,Integer> {

	public Optional<OurUsers> findByEmail(String email);
	
	List<OurUsers> findByIdIn(List<Integer> employeeTds);
	
}
