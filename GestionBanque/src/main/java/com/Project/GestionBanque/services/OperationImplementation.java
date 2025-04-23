package com.Project.GestionBanque.services;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.GestionBanque.enteties.CompteBancaire;
import com.Project.GestionBanque.enteties.Operation;
import com.Project.GestionBanque.enteties.TypeOperation;
import com.Project.GestionBanque.repositories.CompteBancaireRepository;
import com.Project.GestionBanque.repositories.OperationRepository;

import jakarta.transaction.Transactional;

@Service
public class OperationImplementation implements OperationService {
	@Autowired
    private  CompteBancaireRepository compteBancaireRepository;
	@Autowired

    private  OperationRepository operationRepository;


    @Override
    @Transactional
    public Operation effectuerVersement(Long compteId, double montant) {
        Operation operation = new Operation(null, new Date(), montant, TypeOperation.CREDIT);
        
        CompteBancaire compte = compteBancaireRepository.findById(compteId)
                .orElseThrow(() -> new IllegalArgumentException("Compte introuvable"));
        compte.setSolde(compte.getSolde() + montant);
        // Save Operation first to get an ID.
        operation = operationRepository.save(operation);
        Set<Operation> s1 = compte.getOperations();
        s1.add(operation);
        compte.setOperations(s1);
        compteBancaireRepository.save(compte);   
        return operation ;
    }

    @Override
    @Transactional
    public Operation effectuerRetrait(Long compteId, double montant) {
        Operation operation = new Operation(null, new Date(), montant, TypeOperation.DEBIT);
        CompteBancaire compte = compteBancaireRepository.findById(compteId)
                .orElseThrow(() -> new IllegalArgumentException("Compte introuvable"));
        operationRepository.save(operation);
        if(compte.getSolde() >= montant) {
            compte.setSolde(compte.getSolde() - montant);
            Set<Operation> s1 = compte.getOperations();
            s1.add(operation);
            compte.setOperations(s1);
            compteBancaireRepository.save(compte);
            return operation;
        } else {
            throw new IllegalArgumentException("Solde insuffisant");
        }
    }

    @Override
    @Transactional
    public void effectuerVirement(Long compteSourceId, Long compteDestinataireId, double montant) {
        CompteBancaire compteSource = compteBancaireRepository.findById(compteSourceId)
                .orElseThrow(() -> new IllegalArgumentException("Compte source introuvable"));
        CompteBancaire compteDestinataire = compteBancaireRepository.findById(compteDestinataireId)
                .orElseThrow(() -> new IllegalArgumentException("Compte destinataire introuvable"));

        if(compteSource.getSolde() >= montant) {
            compteSource.setSolde(compteSource.getSolde() - montant);
            compteDestinataire.setSolde(compteDestinataire.getSolde() + montant);
            Operation debitOperation = new Operation(null, new Date(), montant, TypeOperation.DEBIT);
            Operation creditOperation = new Operation(null, new Date(), montant, TypeOperation.CREDIT);
            
            operationRepository.save(debitOperation);
            operationRepository.save(creditOperation);
            Set<Operation> s1 = compteSource.getOperations();
            s1.add(debitOperation);
            compteSource.setOperations(s1);
            Set<Operation> s2 = compteDestinataire.getOperations();
            s2.add(creditOperation);
            compteDestinataire.setOperations(s2);
            compteBancaireRepository.save(compteSource);
            compteBancaireRepository.save(compteDestinataire);
            
            
        } else {
            throw new IllegalArgumentException("Solde insuffisant pour le virement");
        }
    }
    @Override
    public List<Operation> getAllOperations() {
        return operationRepository.findAll();
    }
}
