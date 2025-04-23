package com.Project.GestionBanque.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Project.GestionBanque.enteties.Operation;

public interface OperationRepository extends JpaRepository<Operation, Long>{

}
