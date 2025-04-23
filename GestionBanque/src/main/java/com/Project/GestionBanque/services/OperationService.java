package com.Project.GestionBanque.services;

import java.util.List;

import com.Project.GestionBanque.enteties.Operation;

public interface OperationService {
	Operation effectuerVersement(Long compteId, double montant);
	Operation effectuerRetrait(Long compteId, double montant);
    void effectuerVirement(Long compteSourceId, Long compteDestinataireId, double montant);
    public List<Operation> getAllOperations();
    

}
