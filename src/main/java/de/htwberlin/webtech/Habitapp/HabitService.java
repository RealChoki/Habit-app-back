package de.htwberlin.webtech.Habitapp;

import org.springframework.beans.factory.annotation.Autowired;

public class HabitService {
    @Autowired
    HabitRepository repo;

    public Habit save(Habit habit) {
        return repo.save(habit);
    }

    public Habit get(long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Habit not found"));
    }
}
