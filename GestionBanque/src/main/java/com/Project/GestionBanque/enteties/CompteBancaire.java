package com.Project.GestionBanque.enteties;
import java.util.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED) // For inheritance
public class CompteBancaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Temporal(TemporalType.DATE)
    private Date dateCreation;
    private double solde;
    
    @Enumerated(EnumType.STRING)
    private CompteStatut etat;
    
    @ManyToOne
    @JoinColumn(name = "client_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Client client;
    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name = "compte_id" ) // This is the column in the 'Operation' table that will hold the foreign key
    private Set<Operation> operations;
}
enum CompteStatut {
    ACTIVE, BLOQUE, FERME
}