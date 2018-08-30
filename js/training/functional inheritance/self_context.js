function Machine() {
    this._enabled = false;
    var self = this;
    this.id = 5;
    this.id.label = "label";

    this.enable = function() {
        _enabled = true;
    }
    this.disable = function() {
        _enabled = false;
    }
}

function Bus() {
    Machine.apply(this, arguments);

    var parentEnable = this.enable;
    this.enable = function() {
        parentEnable();
        this.run();
    }

    this.run = function() {
        console.log("Inner bus logic");

        console.log(this.id);
        console.log(this.id.label);
    }
}

var bus = new Bus();
bus.enable();