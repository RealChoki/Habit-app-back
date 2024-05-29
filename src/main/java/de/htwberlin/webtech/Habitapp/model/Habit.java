package de.htwberlin.webtech.Habitapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;



@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Habit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String label;
    private String frequency;
    private int timesCompleted;
    private int goal;

    public Habit(String label, String frequency, int goal) {
        this.label = label;
        this.frequency = frequency;
        this.goal = goal;
        this.timesCompleted = 0;
    }

}
