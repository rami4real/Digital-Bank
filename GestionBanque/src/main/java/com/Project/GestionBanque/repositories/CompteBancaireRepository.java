package com.Project.GestionBanque.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Project.GestionBanque.enteties.CompteBancaire;

public interface CompteBancaireRepository extends JpaRepository<CompteBancaire, Long> {

}
