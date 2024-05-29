package de.htwberlin.webtech.Habitapp.service;

import de.htwberlin.webtech.Habitapp.model.Habit;
import de.htwberlin.webtech.Habitapp.persistence.HabitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HabitService {
    
    @Autowired
    private HabitRepository repo;

    public Optional<Habit> getHabit(Long id) {
        return this.repo.findById(id);
    }

    public Iterable<Habit> getHabits() {
        return this.repo.findAll();
    }

    public Habit addHabit(final Habit habit) {
        return this.repo.save(habit);
    }

    public Habit editHabit(final Habit habit) {
        return repo.existsById(habit.getId()) ? repo.save(habit) : null;
    }

    public boolean removeHabit(final Long id){
        final boolean exists = repo.existsById(id);
        if (exists) repo.deleteById(id);
        return exists;
    }
}

