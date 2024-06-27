package de.htwberlin.webtech.Habitapp.model.habit_types;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import de.htwberlin.webtech.Habitapp.model.Habit;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class NumericHabit extends Habit{
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
