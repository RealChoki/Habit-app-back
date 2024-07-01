package de.htwberlin.webtech.Habitapp.web;

import de.htwberlin.webtech.Habitapp.model.Habit;
import de.htwberlin.webtech.Habitapp.service.HabitService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController // Changed to @RestController
@AllArgsConstructor
@RequestMapping("/habits")
public class HabitController {

    private final HabitService habitService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Habit>> getHabits() {
        List<Habit> habits = Arrays.asList(
            new Habit(1L, "Physical", "daily", "Exercise", "30 minutes of cardio", true),
            new Habit(2L, "Mental", "daily", "Read", "Read for 1 hour", true),
            new Habit(3L, "Mental", "daily", "Meditate", "10 minutes of meditation", true)
        );
        return ResponseEntity.ok(habits);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Habit> getHabit(@PathVariable("id") final Long id) {
        return habitService.getHabit(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces =
    // MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<Habit> addHabit(@Valid @RequestBody Habit body) {
    // Habit createdHabit;

    // // Determine the type of habit and construct accordingly
    // if ("yesno".equals(body.getType())) {
    // createdHabit = new Habit(body.getId(), body.getType(), body.getFrequency(),
    // body.getTitle(),
    // body.getDescription(), body.getStatus());
    // } else if ("numeric".equals(body.getType())) {
    // createdHabit = new Habit(body.getId(), body.getType(), body.getFrequency(),
    // body.getTitle(),
    // body.getDescription(), body.getSubtype(), body.getCount(), body.getGoal(),
    // body.getStatus());
    // } else if ("timer".equals(body.getType())) {
    // createdHabit = new Habit(body.getId(), body.getType(), body.getFrequency(),
    // body.getTitle(),
    // body.getDescription(), body.getDefaultTimer(), body.getTimer(),
    // body.getStatus());
    // } else {
    // // Handle other types or throw an error
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    // }

    // // Save the habit using the habitService
    // createdHabit = habitService.addHabit(createdHabit);

    // return new ResponseEntity<>(createdHabit, HttpStatus.CREATED);
    // }

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
