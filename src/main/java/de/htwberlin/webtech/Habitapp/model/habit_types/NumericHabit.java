package de.htwberlin.webtech.Habitapp.model.habit_types;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import de.htwberlin.webtech.Habitapp.model.Habit;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class NumericHabit extends Habit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)   
    private String subtype;
    private Integer count;
    private Integer goal;

    public NumericHabit(Long id, String type, String frequency, String title, String description, String subtype, Integer count, Integer goal, Boolean status) {
        super(id, type, frequency, title, description, status);
        this.subtype = subtype;
        this.count = count;
        this.goal = goal;
    }
}
