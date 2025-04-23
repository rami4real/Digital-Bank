package com.Project.GestionBanque.services;

import java.util.List;
import java.util.Set;

import com.Project.GestionBanque.enteties.Client;
import com.Project.GestionBanque.enteties.CompteBancaire;

public interface ClientService {
	public Client EnregistrerClient(Client client);
    public Client getClientById(Long id);
    public List<Client> getAllClients();
    public Client updateClient(Long id, Client clientDetails);
    public Set<CompteBancaire> findComptesByClientId(Long clientId);
    public Client getClientByEmail(String email);
    public void deleteClient(Long id);
}
