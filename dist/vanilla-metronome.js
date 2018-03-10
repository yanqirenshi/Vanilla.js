class Vanilla_metronome {
    /*
     * {
     *   interval: 1000
     *   tick: function () {}
     * }
     */
    constructor(params) {
        this._timer = null;
        this._count = 0;

        this.interval = params.interval;
        this.tick = params.tick;
    }
    start () {
        if (this._timer)
            this.stop();

        let interval = this.interval ? this.interval : 1000;
        this._timer = setInterval(function () {
            this._count += 1;

            if (this._count==88888887)
                this._count = 1;

            this.tick(this._count);
        }.bind(this), interval);
    }
    stop () {
        if (this._timer)
            clearInterval(this._timer);

        this._count = 0;
        this._timer = null;
    }
}
