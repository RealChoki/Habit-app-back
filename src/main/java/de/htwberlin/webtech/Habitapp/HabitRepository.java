package de.htwberlin.webtech.Habitapp;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface HabitRepository extends CrudRepository<Habit, Long>{}