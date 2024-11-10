package com.jobs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class PortalRegistryApplication {

	public static void main(String[] args) {
		SpringApplication.run(PortalRegistryApplication.class, args);
	}

}
