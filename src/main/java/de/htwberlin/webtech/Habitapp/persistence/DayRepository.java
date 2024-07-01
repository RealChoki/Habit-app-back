package de.htwberlin.webtech.Habitapp.persistence;

import de.htwberlin.webtech.Habitapp.model.Day;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DayRepository extends JpaRepository<Day, Long> {
}
