package de.htwberlin.webtech.Habitapp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Habit {
    private String label;
    private String frequency;
    private int timesCompleted;
    private int goal;
}
