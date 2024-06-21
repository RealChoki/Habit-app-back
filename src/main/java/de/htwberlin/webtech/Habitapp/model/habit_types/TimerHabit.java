package de.htwberlin.webtech.Habitapp.model.habit_types;

import de.htwberlin.webtech.Habitapp.model.Habit;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class TimerHabit extends Habit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer defaultTimer;
    private Integer timer; 

    public TimerHabit(Long id, String type, String frequency, String title, String description, Integer defaultTimer, Integer timer, Boolean status) {
        super(id, type, frequency, title, description, status);
        this.defaultTimer = defaultTimer;
        this.timer = timer;
    }
}


