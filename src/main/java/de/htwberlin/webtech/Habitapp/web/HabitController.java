package de.htwberlin.webtech.Habitapp.web;

import de.htwberlin.webtech.Habitapp.model.Habit;
import de.htwberlin.webtech.Habitapp.service.HabitService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@AllArgsConstructor
@RequestMapping("/habits")
public class HabitController {

	private final HabitService habitService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Iterable<Habit>> getHabit() {
        return ResponseEntity.ok(habitService.getHabits());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Habit> getHabit(@PathVariable("id") final Long id) {
        final Optional<Habit> found = habitService.getHabit(id);
        return found.isPresent() ? ResponseEntity.ok(found.get()) : ResponseEntity.notFound().build();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Habit> addHabit(@Valid @RequestBody Habit body) {
        final Habit h = new Habit(body.getLabel(), body.getFrequency(), body.getGoal());
        final Habit createdHabit = habitService.addHabit(h);
        return new ResponseEntity<>(createdHabit, HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Habit> updateHabit(@PathVariable("id") final Long id, @RequestBody Habit body) {
        body.setId(id);
        final Habit updatedHabit = habitService.editHabit(body);
        if (updatedHabit == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(updatedHabit);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteHabit(@PathVariable("id") final Long id) {
        return habitService.removeHabit(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

}