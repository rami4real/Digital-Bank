package com.Project.GestionBanque.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Project.GestionBanque.enteties.Client;


public interface ClientRepository extends JpaRepository<Client, Long> {
	 Client findByEmail(String email);
}

