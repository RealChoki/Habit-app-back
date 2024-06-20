package de.htwberlin.webtech.Habitapp.web;

import de.htwberlin.webtech.Habitapp.model.Habit;
import de.htwberlin.webtech.Habitapp.service.HabitService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController  // Changed to @RestController
@AllArgsConstructor
@RequestMapping("/habits")
public class HabitController {

    private final HabitService habitService;

    // @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<Iterable<Habit>> getHabits() {  // Changed method name to plural for clarity
    //     return ResponseEntity.ok(habitService.getHabits());
    // }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Habit>> getHabits() {
        // Static data for testing
        List<Habit> habits = Arrays.asList(
            new Habit(1L, "Exercise", "daily", 30),
            new Habit(2L, "Read", "daily", 1),
            new Habit(3L, "Meditate", "daily", 10)
        );
        return ResponseEntity.ok(habits);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Habit> getHabit(@PathVariable("id") final Long id) {
        return habitService.getHabit(id)
                           .map(ResponseEntity::ok)
                           .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Habit> addHabit(@Valid @RequestBody Habit body) {
        final Habit h = new Habit(body.getId(), body.getLabel(), body.getFrequency(), body.getGoal());
        final Habit createdHabit = habitService.addHabit(h);
        return new ResponseEntity<>(createdHabit, HttpStatus.CREATED);
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
