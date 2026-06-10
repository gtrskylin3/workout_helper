const ExerciseDB = {
    async getExerciseGifUrl(russianName) {
        if (!russianName) return null;

        const exerciseName = Translator.translate(russianName);

        try {
            const response = await fetch(`https://oss.exercisedb.dev/api/v1/exercises?name=${exerciseName.toLowerCase()}`);
            if (!response.ok) {
                console.error('Error fetching exercise data:', response.statusText);
                return null;
            }

            const responseJson = await response.json();
            const exercises = responseJson.data;

            if (!Array.isArray(exercises)) {
                console.error('Expected an array of exercises in response.data, but received:', exercises);
                return null;
            }
            if (exercises.length > 0) {
                    return exercises[0].gifUrl;
            }
            return null;
        } catch (error) {
            console.error('Error fetching exercise data:', error);
            return null;
        }
    }
};
