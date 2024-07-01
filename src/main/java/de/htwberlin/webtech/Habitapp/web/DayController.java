package de.htwberlin.webtech.Habitapp.web;

import de.htwberlin.webtech.Habitapp.model.Day;
import de.htwberlin.webtech.Habitapp.persistence.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/days")
public class DayController {

    @Autowired
    private DayRepository dayRepository;

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Day>> getAllDays() {
        List<Day> days = dayRepository.findAll();
        return ResponseEntity.ok(days);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Day> getDayById(@PathVariable Long id) {
        Optional<Day> day = dayRepository.findById(id);
        return day.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Day> createDay(@RequestBody Day day) {
        Day savedDay = dayRepository.save(day);
        return ResponseEntity.ok(savedDay);
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Day> updateDay(@PathVariable Long id, @RequestBody Day dayDetails) {
        Optional<Day> optionalDay = dayRepository.findById(id);
        if (optionalDay.isPresent()) {
            Day day = optionalDay.get();
            day.setHabits(dayDetails.getHabits());
            day.setCompleted(dayDetails.isCompleted());
            Day updatedDay = dayRepository.save(day);
            return ResponseEntity.ok(updatedDay);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteDay(@PathVariable Long id) {
        if (dayRepository.existsById(id)) {
            dayRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
