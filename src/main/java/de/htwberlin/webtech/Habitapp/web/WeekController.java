package de.htwberlin.webtech.Habitapp.web;

import de.htwberlin.webtech.Habitapp.model.Day;
import de.htwberlin.webtech.Habitapp.model.Habit;
import de.htwberlin.webtech.Habitapp.model.habit_types.NumericHabit;
import de.htwberlin.webtech.Habitapp.model.habit_types.TimerHabit;
import de.htwberlin.webtech.Habitapp.model.habit_types.YesNoHabit;
import de.htwberlin.webtech.Habitapp.persistence.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/week")
public class WeekController {

    @Autowired
    private DayRepository dayRepository;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // Fetch data for the week (or date range)
    @GetMapping(value = "/{startDate}/{endDate}", produces = "application/json")
    public ResponseEntity<List<Day>> getWeekData(@PathVariable String startDate, @PathVariable String endDate) {
        LocalDate start = LocalDate.parse(startDate, dateFormatter);
        LocalDate end = LocalDate.parse(endDate, dateFormatter);

        // Fetch all days in the specified range
        List<Day> weekData = dayRepository.findByDateBetween(start, end);

        // Create dummy data for missing days
        List<Day> completeWeekData = fillMissingDays(weekData, start, end);

        return ResponseEntity.ok(completeWeekData);
    }

    // Fill missing days by creating dummy data
    private List<Day> fillMissingDays(List<Day> existingDays, LocalDate startDate, LocalDate endDate) {
        List<Day> completeWeekData = new ArrayList<>(existingDays);
        List<String> existingDates = existingDays.stream()
                .map(Day::getId)
                .collect(Collectors.toList());

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            String dateString = date.format(dateFormatter);
            if (!existingDates.contains(dateString)) {
                Day dummyDay = createDummyDay(dateString);
                completeWeekData.add(dayRepository.save(dummyDay));
            }
        }

        return completeWeekData;
    }

    // Create dummy data for missing days
    private Day createDummyDay(String date) {
        List<Habit> habits = new ArrayList<>();
        habits.add(new YesNoHabit(1L, "yesno", "daily", "Go to gym", "Go to the gym and workout for at least 1 hour",
                false));
        habits.add(new NumericHabit(2L, "numeric", "daily", "Drink 5 Glasses of Water",
                "Drink at least 5 glasses of water today", "increment", 0, 5, false));
        habits.add(new TimerHabit(3L, "timer", "daily", "Play 1 hour of Piano",
                "Play the piano for at least 1 hour today", 3, 3, false));

        return new Day(date, habits, false); // Use the `date` as the `id` for the Day object
    }
}
