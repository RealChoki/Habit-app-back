const DailyHabit = require('../models/DailyHabit');

const createDailyHabits = async (habit, userId) => {
  const { startDate, frequency, _id: habitId } = habit;
  console.log("createDailyHabits", startDate, frequency, habitId, userId);  // Log to inspect input

  // Step 1: Check the frequency and create daily habits if frequency is 'daily'
  if (frequency === 'daily') {
    let currentDate = new Date(startDate);
    const daysToCreate = 30;  // Example: Create habits for the next 30 days

    for (let i = 0; i < daysToCreate; i++) {
      // Step 2: Create the DailyHabit document
      const dailyHabit = new DailyHabit({
        userId: userId,  // Directly using userId passed from params
        habitId: habitId,
        timestamp: new Date(currentDate),  // Timestamp for each day's habit
        completed: null  // Initially set to null, can be updated later
      });

      await dailyHabit.save();  // Save the daily habit to the database
      currentDate.setDate(currentDate.getDate() + 1);  // Move to the next day
    }
  } else {
    console.log("// Future logic for other frequencies");
  }
};

module.exports = { createDailyHabits };
