package com.Project.GestionBanque;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import com.Project.GestionBanque.enteties.Client;
import com.Project.GestionBanque.services.ClientService;

@SpringBootApplication
public class GestionBanqueApplication implements CommandLineRunner{
	@Autowired
	private ClientService cS ;
	public static void main(String[] args) {
		SpringApplication.run(GestionBanqueApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
	}
}
