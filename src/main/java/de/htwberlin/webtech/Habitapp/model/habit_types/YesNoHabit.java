package de.htwberlin.webtech.Habitapp.model.habit_types;

import de.htwberlin.webtech.Habitapp.model.Habit;
import jakarta.persistence.Entity;

@Entity
public class YesNoHabit extends Habit {

    public YesNoHabit() {
    }

    public YesNoHabit(Long id, String type, String frequency, String title, String description, Boolean status) {
        super(id, type, frequency, title, description, status);
    }
}
