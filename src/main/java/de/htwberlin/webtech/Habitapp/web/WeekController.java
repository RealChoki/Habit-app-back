package de.htwberlin.webtech.Habitapp.web;

import de.htwberlin.webtech.Habitapp.model.Day;
import de.htwberlin.webtech.Habitapp.persistence.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import de.htwberlin.webtech.Habitapp.model.Habit;
import de.htwberlin.webtech.Habitapp.model.habit_types.NumericHabit;
import de.htwberlin.webtech.Habitapp.model.habit_types.TimerHabit;
import de.htwberlin.webtech.Habitapp.model.habit_types.YesNoHabit;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/week")
public class WeekController {

    @Autowired
    private DayRepository dayRepository;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @GetMapping(value = "/{startDate}/{endDate}", produces = "application/json")
    public ResponseEntity<List<Day>> getWeekData(@PathVariable String startDate, @PathVariable String endDate) {
        List<Day> weekData = new ArrayList<>();

        LocalDate start = LocalDate.parse(startDate, dateFormatter);
        LocalDate end = LocalDate.parse(endDate, dateFormatter);

        for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
            String dateString = date.format(dateFormatter);
            Day day = dayRepository.findById(dateString).orElseGet(() -> createDummyDay(dateString));
            weekData.add(day);
        }

        return ResponseEntity.ok(weekData);
    }

    private Day createDummyDay(String date) {
        List<Habit> habits = Arrays.asList(
                new YesNoHabit(1L, "yesno", "daily", "Go to gym", "Go to the gym and workout for at least 1 hour", false),
                new NumericHabit(2L, "numeric", "daily", "Drink 5 Glasses of Water", "Drink at least 5 glasses of water today", "increment", 0, 5, false),
                new TimerHabit(3L, "timer", "daily", "Play 1 hour of Piano", "Play the piano for at least 1 hour today", 3, 3, false)
        );
        return new Day(date, habits, false);
    }
}
