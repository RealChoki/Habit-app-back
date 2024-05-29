package de.htwberlin.webtech.Habitapp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Habit {
    private long id;
    private String label;
    private String frequency;
    private int timesCompleted;
    private int goal;

}
