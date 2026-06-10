const ExerciseDB = {
    // A hardcoded list of local GIFs found in the 'gif' directory.
    _localGifs: [
        'gif/1.gif',
        'gif/2.gif',
        'gif/3.gif',
        'gif/4.gif',
        'gif/5.gif',
        'gif/6.gif',
        'gif/7.gif',
        'gif/8.gif'
    ],

    /**
     * Returns a path to a random local GIF.
     * This function is synchronous and does not require any arguments.
     * @returns {string} A path like 'gif/4.gif'.
     */
    getExerciseGifUrl() {
        const randomIndex = Math.floor(Math.random() * this._localGifs.length);
        return this._localGifs[randomIndex];
    }
};
