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
                dailyHabitData.currentTime = initialTime;
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

const deleteDailyHabits = async (habitId) => {
    try {
        const result = await DailyHabit.deleteMany({ habitId: habitId });

        if (result.deletedCount > 0) {
            console.log(`Successfully deleted ${result.deletedCount} daily habits for habitId: ${habitId}`);
        } else {
            console.log(`No daily habits found for habitId: ${habitId} and userId: ${userId}`);
        }

        return result;
    } catch (error) {
        console.error('Error deleting daily habits:', error);
        throw new Error('Error deleting daily habits');
    }
};

module.exports = { createDailyHabits, deleteDailyHabits };
