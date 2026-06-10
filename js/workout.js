const Workout = {
    async load() {
        const response = await fetch('data/workouts.json');
        return await response.json();
    }
};