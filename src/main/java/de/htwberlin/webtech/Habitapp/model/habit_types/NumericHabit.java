package de.htwberlin.webtech.Habitapp.model.habit_types;

import de.htwberlin.webtech.Habitapp.model.Habit;
import jakarta.persistence.Entity;

@Entity
public class NumericHabit extends Habit {

    private String subtype;
    private Integer count;
    private Integer goal;

    public NumericHabit() {
    }

    public NumericHabit(Long id, String type, String frequency, String title, String description, String subtype, Integer count, Integer goal, Boolean status) {
        super(id, type, frequency, title, description, status);
        this.subtype = subtype;
        this.count = count;
        this.goal = goal;
    }

    // Getters and Setters
    public String getSubtype() { return subtype; }
    public void setSubtype(String subtype) { this.subtype = subtype; }
    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }
    public Integer getGoal() { return goal; }
    public void setGoal(Integer goal) { this.goal = goal; }
}
