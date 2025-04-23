package com.Project.GestionBanque.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.GestionBanque.enteties.Client;
import com.Project.GestionBanque.enteties.CompteBancaire;
import com.Project.GestionBanque.repositories.ClientRepository;
@Service
public class ClientImplementation implements ClientService {
	@Autowired
	private ClientRepository clientRepository;
	@Autowired
	private CompteBancaireService cbService;
    private List<Client> clients; // Suppose this is your list of clients

	public Client EnregistrerClient(Client client) {
		return clientRepository.save(client);
	}
	@Override
    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found")); // You can use a custom exception here
	}
	
     

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client updateClient(Long id, Client clientDetails) {
        Client client = getClientById(id);
        client.setNom(clientDetails.getNom());
        client.setPrenom(clientDetails.getPrenom());
        client.setEmail(clientDetails.getEmail());
        return clientRepository.save(client);
    }
    public Set<CompteBancaire> findComptesByClientId(Long clientId) {
        List<CompteBancaire> comptes = cbService.getAllComptes();
        // Filter the list to include only comptes belonging to the specified client ID
        Set<CompteBancaire> filteredComptes = comptes.stream()
                .filter(compte -> compte.getClient() != null && clientId.equals(compte.getClient().getId()))
                .collect(Collectors.toSet());

        return filteredComptes;
    }
    public Client getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }
    @Override
    public void deleteClient(Long id) {
    	clientRepository.deleteById(id);
    }

}
