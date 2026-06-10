const translations = {
    "Приседания с гантелями": "squat",
    "Отжимания": "push up",
    "Тяга гантели в упоре": "dumbbell row",
    "Жим гантелей стоя": "dumbbell overhead press",
    "Сгибания на бицепс": "dumbbell squat",
    "Планка": "plank",
    "Подтягивания с жгутом": "pull-ups",
    "Жим гантелей на полу": "dumbbell press",
    "Румынская тяга с гантелями": "dumbbell deadlift",
    "Отжимания узким хватом": "close grip push up",
    "Скручивания": "crunch"
};

const Translator = {
    translate(russianName) {
        return translations[russianName] || russianName;
    }
};
