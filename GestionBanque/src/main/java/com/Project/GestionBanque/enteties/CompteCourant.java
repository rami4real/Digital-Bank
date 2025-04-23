package com.Project.GestionBanque.enteties;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class CompteCourant extends CompteBancaire {
    private double decouvert;
}
