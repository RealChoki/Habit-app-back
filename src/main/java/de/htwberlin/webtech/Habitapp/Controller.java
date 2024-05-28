package de.htwberlin.webtech.Habitapp;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class Controller {

	@GetMapping("/habit")
	public ResponseEntity<Habit> getHabit() {
		final Habit habit = new Habit("Drink water", "daily", 3, 8);
		return ResponseEntity.ok(habit);
	}

}