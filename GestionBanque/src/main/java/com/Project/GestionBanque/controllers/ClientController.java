package com.Project.GestionBanque.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Project.GestionBanque.enteties.Client;
import com.Project.GestionBanque.enteties.CompteBancaire;
import com.Project.GestionBanque.services.ClientService;
import com.Project.GestionBanque.services.CompteBancaireService;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class ClientController {
    @Autowired
    private  ClientService clientService;

    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientService.EnregistrerClient(client);
    }


    @GetMapping("/{email}")
    public Client getClientByEmail(@PathVariable String email) {
        // Utilisez le service pour obtenir le client par son adresse e-mail
        return clientService.getClientByEmail(email);
    }

    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody Client clientDetails) {
        return clientService.updateClient(id, clientDetails);
    }
    @GetMapping("/{clientId}/comptes")
    public Set<CompteBancaire> findComptes(@PathVariable Long clientId){
        return clientService.findComptesByClientId(clientId);
    }
    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }
}
