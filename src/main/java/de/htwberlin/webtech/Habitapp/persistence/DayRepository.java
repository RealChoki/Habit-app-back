package de.htwberlin.webtech.Habitapp.persistence;

import de.htwberlin.webtech.Habitapp.model.Day;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DayRepository extends JpaRepository<Day, String> {

    List<Day> findByDateBetween(LocalDate startDate, LocalDate endDate);
    List<Day> findByCompleted(boolean completed);
}
