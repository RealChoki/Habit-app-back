const DailyHabit = require('../models/DailyHabit');

const createDailyHabits = async (habit, userId) => {
    const { startDate, frequency, _id: habitId, goal, count, subtype, currentTime, initialTime } = habit;
    console.log("createDailyHabits", startDate, frequency, habitId, userId, goal, count, subtype, currentTime, initialTime);

    if (frequency === 'daily') {
        let currentDate = new Date(startDate);
        const daysToCreate = 30;  // Example: Create habits for the next 30 days

        for (let i = 0; i < daysToCreate; i++) {
            const dailyHabitData = {
                userId: userId,
                habitId: habitId,
                timestamp: new Date(currentDate),
                completed: null,
            };

            // Include numeric habit fields if it's a numeric habit
            if (habit.type === 'numeric') {
                dailyHabitData.count = 0;
                dailyHabitData.goal = goal;
                dailyHabitData.subtype = subtype;
            }

            // Include timer habit fields if it's a timer habit
            if (habit.type === 'timer') {
                dailyHabitData.currentTime = currentTime;
                dailyHabitData.initialTime = initialTime;
            }

            const dailyHabit = new DailyHabit(dailyHabitData);
            await dailyHabit.save();
            currentDate.setDate(currentDate.getDate() + 1);
        }
    } else {
        console.log("// Future logic for other frequencies");
    }
};

module.exports = { createDailyHabits };
