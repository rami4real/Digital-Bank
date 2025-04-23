package com.Project.GestionBanque.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Project.GestionBanque.enteties.CompteBancaire;
import com.Project.GestionBanque.enteties.CompteCourant;
import com.Project.GestionBanque.enteties.CompteEpargne;
import com.Project.GestionBanque.services.CompteBancaireService;

@RestController
@RequestMapping("/api/comptes")
@CrossOrigin(origins = "*")

public class CompteBancaireController {
    @Autowired
	private CompteBancaireService compteBancaireService;

    @PostMapping("/sauvegarder-compte-courant")
    public CompteBancaire saveCompteCourant(@RequestBody CompteCourant compteCourant) {
    	return compteBancaireService.createCompte(compteCourant);
    	}
    @PostMapping("/sauvegarder-compte-epargne")
    public CompteBancaire saveCompteEpargne(@RequestBody CompteEpargne compteEpargne) {
        return compteBancaireService.createCompte(compteEpargne);
    }

    @GetMapping("/{id}")
    public CompteBancaire getCompteById(@PathVariable Long id) {
        return compteBancaireService.getCompteById(id);
    }

    @GetMapping
    public List<CompteBancaire> getAllComptes() {
        return compteBancaireService.getAllComptes();
    }

    @PutMapping("/{id}")
    public CompteBancaire updateCompte(@PathVariable Long id, @RequestBody CompteBancaire compteDetails) {
        return compteBancaireService.updateCompte(id, compteDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteCompte(@PathVariable Long id) {
        compteBancaireService.deleteCompte(id);
    }
}
