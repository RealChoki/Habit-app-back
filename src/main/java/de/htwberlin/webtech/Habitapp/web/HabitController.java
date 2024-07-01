package de.htwberlin.webtech.Habitapp.web;

import de.htwberlin.webtech.Habitapp.model.Habit;
import de.htwberlin.webtech.Habitapp.model.habit_types.NumericHabit;
import de.htwberlin.webtech.Habitapp.model.habit_types.TimerHabit;
import de.htwberlin.webtech.Habitapp.model.habit_types.YesNoHabit;
import de.htwberlin.webtech.Habitapp.service.HabitService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/habits")
public class HabitController {

    private final HabitService habitService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Habit>> getHabits() {
        List<Habit> habits = Arrays.asList(
                new YesNoHabit(1L, "yesno", "daily", "Go to gym", "Go to the gym and workout for at least 1 hour",
                        false),
                new NumericHabit(2L, "numeric", "daily", "Drink 5 Glasses of Water",
                        "Drink at least 5 glasses of water today", "increment", 0, 5, false),
                new TimerHabit(3L, "timer", "daily", "Play 1 hour of Piano", "Play the piano for at least 1 hour today",
                        3, 3, false));
        return ResponseEntity.ok(habits);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Habit> getHabit(@PathVariable("id") final Long id) {
        return habitService.getHabit(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Habit> updateHabit(@PathVariable("id") final Long id, @RequestBody Habit body) {
        body.setId(id);
        return Optional.ofNullable(habitService.editHabit(body))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteHabit(@PathVariable("id") final Long id) {
        return habitService.removeHabit(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

}
