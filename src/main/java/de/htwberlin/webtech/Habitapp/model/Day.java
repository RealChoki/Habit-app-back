package de.htwberlin.webtech.Habitapp.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Day {
    @Id
    private String id;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Habit> habits;
    private boolean completed;
}
