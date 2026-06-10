document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        screen: 'home', // 'home', 'workout', 'history'
        workouts: null,
        stats: {
            streak: 0,
            lastWorkout: null,
            totalWorkouts: 0,
            ...Storage.get('workout-stats')
        },
        history: [],
        currentWorkout: null,
        currentExerciseIndex: 0,
        currentSet: 1,
        workoutStartTime: null,
        isResting: false,
        restTime: 0,
        nextExerciseName: '',

        async init() {
            this.workouts = await Workout.load();
            this.history = Storage.get('workout-history') || [];
            this.stats.streak = Streak.calculate(this.history);
        },

        get currentExercise() {
            if (!this.currentWorkout) return null;
            return this.workouts[this.currentWorkout][this.currentExerciseIndex];
        },

        get workoutProgress() {
            if (!this.currentWorkout) return 0;
            const totalExercises = this.workouts[this.currentWorkout].length;
            return Math.round((this.currentExerciseIndex / totalExercises) * 100);
        },

        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        },

        startWorkout(workoutName) {
            this.currentWorkout = workoutName === 'A' ? 'workoutA' : 'workoutB';
            this.currentExerciseIndex = 0;
            this.currentSet = 1;
            this.workoutStartTime = new Date();
            this.screen = 'workout';
        },

        finishSet() {
            const exerciseJustFinished = this.currentExercise;
            const isLastSet = this.currentSet >= exerciseJustFinished.sets;

            if (isLastSet) {
                const isLastExercise = this.currentExerciseIndex >= this.workouts[this.currentWorkout].length - 1;
                if (isLastExercise) {
                    this.finishWorkout();
                    return;
                }
                // Move to next exercise
                this.currentExerciseIndex++;
                this.currentSet = 1;
                this.nextExerciseName = `Следующее упражнение: ${this.currentExercise.name}`;
            } else {
                // Move to next set
                this.currentSet++;
                this.nextExerciseName = `Следующий подход: ${this.currentSet} из ${exerciseJustFinished.sets}`;
            }

            if (exerciseJustFinished.rest > 0) {
                this.isResting = true;
                this.restTime = exerciseJustFinished.rest;
                Timer.start(
                    exerciseJustFinished.rest,
                    (remaining) => { this.restTime = remaining; },
                    () => { this.isResting = false; }
                );
            }
        },

        finishWorkout() {
            const duration = Math.round((new Date() - this.workoutStartTime) / 1000 / 60); // in minutes
            const today = new Date().toLocaleDateString('ru-RU');

            const newHistoryItem = {
                date: today,
                workout: this.currentWorkout === 'workoutA' ? 'A' : 'B',
                duration: duration,
                completedExercises: this.workouts[this.currentWorkout].length,
                completedSets: this.workouts[this.currentWorkout].reduce((acc, ex) => acc + ex.sets, 0)
            };

            this.history.unshift(newHistoryItem);
            Storage.set('workout-history', this.history);

            this.stats.totalWorkouts++;
            this.stats.lastWorkout = today;
            this.stats.streak = Streak.calculate(this.history);
            Storage.set('workout-stats', this.stats);
            
            this.screen = 'home';
        },

        skipRest() {
            Timer.stop();
            this.isResting = false;
        },

        showHistory() {
            this.screen = 'history';
        },

        goHome() {
            this.screen = 'home';
        }
    }));
});