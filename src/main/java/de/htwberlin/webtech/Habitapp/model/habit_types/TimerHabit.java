package de.htwberlin.webtech.Habitapp.model.habit_types;

import de.htwberlin.webtech.Habitapp.model.Habit;
import jakarta.persistence.Entity;

@Entity
public class TimerHabit extends Habit {

    private Integer timer;
    private Integer defaultTimer;

    public TimerHabit() {
    }

    public TimerHabit(Long id, String type, String frequency, String title, String description, Integer defaultTimer, Integer timer, Boolean status) {
        super(id, type, frequency, title, description, status);
        this.defaultTimer = defaultTimer;
        this.timer = timer;
    }

    // Getters and Setters
    public Integer getTimer() { return timer; }
    public void setTimer(Integer timer) { this.timer = timer; }
    public Integer getDefaultTimer() { return defaultTimer; }
    public void setDefaultTimer(Integer defaultTimer) { this.defaultTimer = defaultTimer; }
}
