package de.htwberlin.webtech.Habitapp.web;

import de.htwberlin.webtech.Habitapp.model.Day;
import de.htwberlin.webtech.Habitapp.persistence.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import de.htwberlin.webtech.Habitapp.model.Habit;
import de.htwberlin.webtech.Habitapp.model.habit_types.NumericHabit;
import de.htwberlin.webtech.Habitapp.model.habit_types.TimerHabit;
import de.htwberlin.webtech.Habitapp.model.habit_types.YesNoHabit;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Arrays;

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
    public ResponseEntity<Day> getDayById(@PathVariable String id) {
        if (id.equals("2024-06-01")) {
            List<Habit> habits = Arrays.asList(
                    new YesNoHabit(1L, "yesno", "daily", "Go to gym", "Go to the gym and workout for at least 1 hour",
                            false),
                    new NumericHabit(2L, "numeric", "daily", "Drink 5 Glasses of Water",
                            "Drink at least 5 glasses of water today", "increment", 0, 5, false),
                    new TimerHabit(3L, "timer", "daily", "Play 1 hour of Piano",
                            "Play the piano for at least 1 hour today",
                            3, 3, false));
            Day dummyDay = new Day("2024-06-01", habits, false);
            return ResponseEntity.ok(dummyDay);
        } else {
            return dayRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Day> createDay(@RequestBody Day day) {
        Day savedDay = dayRepository.save(day);
        return ResponseEntity.ok(savedDay);
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Day> updateDay(@PathVariable String id, @RequestBody Day dayDetails) {
        return dayRepository.findById(id)
                .map(day -> {
                    day.setHabits(dayDetails.getHabits());
                    day.setCompleted(dayDetails.isCompleted());
                    Day updatedDay = dayRepository.save(day);
                    return ResponseEntity.ok(updatedDay);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteDay(@PathVariable String id) {
        if (dayRepository.existsById(id)) {
            dayRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}