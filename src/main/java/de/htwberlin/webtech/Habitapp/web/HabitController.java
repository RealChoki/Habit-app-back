package de.htwberlin.webtech.Habitapp.web;

import de.htwberlin.webtech.Habitapp.model.Day;
import de.htwberlin.webtech.Habitapp.model.Habit;
import de.htwberlin.webtech.Habitapp.service.HabitService;
import de.htwberlin.webtech.Habitapp.model.habit_types.NumericHabit;
import de.htwberlin.webtech.Habitapp.model.habit_types.TimerHabit;
import de.htwberlin.webtech.Habitapp.model.habit_types.YesNoHabit;
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
    public ResponseEntity<Day> getDay() {
        List<Habit> habits = Arrays.asList(
                new YesNoHabit(1L, "yesno", "daily", "Go to gym", "Go to the gym and workout for at least 1 hour",
                        false),
                new NumericHabit(2L, "numeric", "daily", "Drink 5 Glasses of Water",
                        "Drink at least 5 glasses of water today", "increment", 0, 5, false),
                new TimerHabit(3L, "timer", "daily", "Play 1 hour of Piano", "Play the piano for at least 1 hour today",
                        60, 60, false));

        // Using a date-based id for the day (e.g., 20240620)
        Day day = new Day(20240620L, habits, false);
        return ResponseEntity.ok(day);
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
