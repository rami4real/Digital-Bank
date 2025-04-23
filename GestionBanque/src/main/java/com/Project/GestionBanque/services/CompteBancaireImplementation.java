package com.Project.GestionBanque.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.GestionBanque.enteties.Client;
import com.Project.GestionBanque.enteties.CompteBancaire;
import com.Project.GestionBanque.enteties.CompteCourant;
import com.Project.GestionBanque.enteties.CompteEpargne;
import com.Project.GestionBanque.repositories.CompteBancaireRepository;
import com.Project.GestionBanque.services.ClientService;
@Service
public class CompteBancaireImplementation implements CompteBancaireService {
	
	@Autowired
    private CompteBancaireRepository compteBancaireRepository;
	
    @Override
    public CompteBancaire createCompte(CompteBancaire compte) {
    	return compteBancaireRepository.save(compte);
        
    }
    @Override
    public CompteBancaire createCompte(CompteCourant compte) {
    	return compteBancaireRepository.save(compte);
         
    }
    @Override
    public CompteBancaire createCompte(CompteEpargne compte) {
    	return compteBancaireRepository.save(compte);
    }

    @Override
    public CompteBancaire getCompteById(Long id) {
        return compteBancaireRepository.findById(id).orElseThrow(() -> new RuntimeException("Compte not found"));
    }

    @Override
    public List<CompteBancaire> getAllComptes() {
        return compteBancaireRepository.findAll();
    }

    @Override
    public CompteBancaire updateCompte(Long id, CompteBancaire compteDetails) {
        CompteBancaire compte = getCompteById(id);
        
        
        
        compte.setId(compteDetails.getId());
        compte.setDateCreation(compteDetails.getDateCreation());
        compte.setSolde(compteDetails.getSolde());
        return compteBancaireRepository.save(compte);
    }

    @Override
    public void deleteCompte(Long id) {
        compteBancaireRepository.deleteById(id);
    }
    

}
