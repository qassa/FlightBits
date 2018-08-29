function Airplane() {

    this._id = {
        name: "id",
        type: "numeric",
        value: ""
    };
    this._number = {
        name: "№",
        type: "text",
        value: ""
    };
    this._type_vs = {
        name: "Тип воздушного судна",
        type: "text",
        value: ""
    };
    this._preview = {
        name: "Превью",
        type: "image",
        value: ""
    };
    this._techstate = {
        name: "Техническое состояние",
        type: "text",
        value: ""
    };
    this._cruiserSpeed = {
        name: "Крейсерская скорость",
        type: "numeric",
        value: ""
    };
    this._maxWeightCapacity = {
        name: "Грузоподъемность",
        type: "numeric",
        value: ""
    };
    this._maxFlightHeight = {
        name: "Максимальная высота полета",
        type: "numeric",
        value: ""
    };
    this._distance = {
        name: "Дальность полета",
        type: "numeric",
        value: ""
    };
    this._fuelState = {
        name: "Уровень топлива",
        type: "text",
        value: ""
    };
    this._airCompanyOwner = {
        name: "Авиакомпания",
        type: "text",
        value: ""
    };
    this._seats = [];

    this.display_fields = {
        _number: this._number,
        _type_vs: this._type_vs,
        _preview: this._preview,
        _techstate: this._techstate,
        _cruiserSpeed: this._cruiserSpeed,
        _maxWeightCapacity: this._maxWeightCapacity,
        _maxFlightHeight: this._maxFlightHeight,
        _distance: this._distance,
        _fuelState: this._fuelState,
        _airCompanyOwner: this._airCompanyOwner
    }

    this.enum_fields = {
        _id: this._id,
        _number: this._number,
        _type_vs: this._type_vs,
        _preview: this._preview,
        _techstate: this._techstate,
        _cruiserSpeed: this._cruiserSpeed,
        _maxWeightCapacity: this._maxWeightCapacity,
        _maxFlightHeight: this._maxFlightHeight,
        _distance: this._distance,
        _fuelState: this._fuelState,
        _airCompanyOwner: this._airCompanyOwner,
    }


    //this._number = (Object.keys(this._fields))[0];
    //this._number = this._fields._number;



    this.fly = function(departurePoint, destinationPoint) {

    }
}