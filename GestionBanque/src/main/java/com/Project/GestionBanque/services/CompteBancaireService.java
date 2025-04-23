package com.Project.GestionBanque.services;

import java.util.List;

import com.Project.GestionBanque.enteties.CompteBancaire;
import com.Project.GestionBanque.enteties.CompteCourant;
import com.Project.GestionBanque.enteties.CompteEpargne;

public interface CompteBancaireService {
	CompteBancaire createCompte(CompteBancaire compte);

	CompteBancaire createCompte(CompteCourant compte);

	CompteBancaire createCompte(CompteEpargne compte);

	CompteBancaire getCompteById(Long id);

	List<CompteBancaire> getAllComptes();

	CompteBancaire updateCompte(Long id, CompteBancaire compteDetails);

	void deleteCompte(Long id);

}
