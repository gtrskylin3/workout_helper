const Streak = {
    calculate(history) {
        if (!history || history.length === 0) {
            return 0;
        }

        const dates = [...new Set(history.map(item => item.date))].map(this._parseDate).sort((a, b) => b - a);

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const firstDate = new Date(dates[0]);
        firstDate.setHours(0,0,0,0);

        if (firstDate.getTime() !== today.getTime() && firstDate.getTime() !== yesterday.getTime()) {
            return 0;
        }

        streak = 1;
        let lastDate = firstDate;

        for (let i = 1; i < dates.length; i++) {
            const currentDate = new Date(dates[i]);
            currentDate.setHours(0,0,0,0);
            const expectedDate = new Date(lastDate);
            expectedDate.setDate(expectedDate.getDate() - 1);

            if (currentDate.getTime() === expectedDate.getTime()) {
                streak++;
                lastDate = currentDate;
            } else {
                break;
            }
        }

        return streak;
    },

    _parseDate(dateString) {
        const [day, month, year] = dateString.split('.');
        return new Date(year, month - 1, day);
    }
};