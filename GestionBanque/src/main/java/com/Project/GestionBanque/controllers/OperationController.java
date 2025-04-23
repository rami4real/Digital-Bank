package com.Project.GestionBanque.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Project.GestionBanque.enteties.Client;
import com.Project.GestionBanque.enteties.Operation;
import com.Project.GestionBanque.services.OperationService;

@RestController
@RequestMapping("/api/operations")
@CrossOrigin(origins = "*")

public class OperationController {
    @Autowired
    private OperationService operationService;
    @GetMapping
    public List<Operation> getAllClients() {
        return operationService.getAllOperations();
    }
    @PostMapping("/versement")
    public Operation effectuerVersement(@RequestBody Map<String, Object> request) {
        Long compteId = ((Number) request.get("compteId")).longValue();
        double montant = ((Number) request.get("montant")).doubleValue();
        return operationService.effectuerVersement(compteId, montant);
    }

    @PostMapping("/retrait")
    public Operation effectuerRetrait(@RequestBody Map<String, Object> request) {
    	Long compteId = ((Number) request.get("compteId")).longValue();
        double montant = ((Number) request.get("montant")).doubleValue();
        return operationService.effectuerRetrait(compteId, montant);
        
    }

    @PostMapping("/virement")
    public void effectuerVirement(@RequestBody Map<String, Object> request) {
    	Long compteSourceId = ((Number) request.get("compteSourceId")).longValue();
    	Long compteDestinataireId = ((Number) request.get("compteDestinataireId")).longValue();
        double montant = ((Number) request.get("montant")).doubleValue();
        operationService.effectuerVirement(compteSourceId, compteDestinataireId, montant);
    }

}
