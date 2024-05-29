package de.htwberlin.webtech.Habitapp.persistence;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import de.htwberlin.webtech.Habitapp.model.Habit;

@Repository
public interface HabitRepository extends CrudRepository<Habit, Long>{}