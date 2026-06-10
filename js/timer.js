const Timer = {
    interval: null,

    start(duration, onTick, onEnd) {
        let remaining = duration;
        this.interval = setInterval(() => {
            remaining--;
            if (onTick) {
                onTick(remaining);
            }
            if (remaining <= 0) {
                this.stop();
                if (onEnd) {
                    onEnd();
                }
            }
        }, 1000);
    },

    stop() {
        clearInterval(this.interval);
    }
};