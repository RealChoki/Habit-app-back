package de.htwberlin.webtech.Habitapp.model.habit_types;

import de.htwberlin.webtech.Habitapp.model.Habit;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class TimerHabit extends Habit {
    private Integer defaultTimer;
    private Integer timer; 

    public TimerHabit(Long id, String type, String frequency, String title, String description, Integer defaultTimer, Integer timer, Boolean status) {
        super(id, type, frequency, title, description, status);
        this.defaultTimer = defaultTimer;
        this.timer = timer;
    }
}
