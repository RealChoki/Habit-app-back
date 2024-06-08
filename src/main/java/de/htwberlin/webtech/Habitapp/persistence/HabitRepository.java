package de.htwberlin.webtech.Habitapp.persistence;

import de.htwberlin.webtech.Habitapp.model.Habit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitRepository extends CrudRepository<Habit, Long>{}