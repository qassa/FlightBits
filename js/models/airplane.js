function Airplane(context, concreteController) {
    this.data; //хранилище для последней выборки из источника данных
    this.controller;

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

    //поля, которые проходят валидацию при CRUD-операциях
    this.valid_fields = {
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

    this.validModel = function(record) {
        //проверка списка полей, сохранение только совпадающих полей
        //в вехрнем цикле перебор полей самого объекта (гарантирует правильный порядок полей)
        for (keyD in this.valid_fields) {
            for (key in record) {
                if (key == keyD) {
                    //валидация содержимого (мы не можем знать, какие данные придут от клиента)
                    if (valid(record[key]))
                        this.enum_fields[key] = record[key];
                }
            }
            //поле не было надено в переданной записи
        }
    }

    this.valid = function(field) {
        //проверить регулярное выражение

        return true;
    }

    this.create = function(record) {
        //присвоение ID
        this.enum_fields._id.value = global_id++;

        this.validModel();

        //создание новой записи в БД
        rec = {};
        rec["id"] = this.enum_fields._id.value;
        keys = Object.keys(this.display_fields);
        for (var key of keys) {
            rec[key.substring(1)] = {};
            rec[key.substring(1)] = record[key.substring(1)];
        }
        this.data.push(rec);

        //сообщить контроллеру об изменении в записях
        this.controller.addViewRec(rec);
    }

    this.readAll = function(dKeys) {
        //считать все записи
        exp = [];
        this.data.forEach(function(record) {
            //для каждого нового поля
            keys = Object.keys(record);
            rec = {};
            keys.forEach(function(key) {
                dKeys.forEach(function(dataKey) {
                    if (dataKey == key) {
                        rec[key] = new Object();
                        rec[key].type = this.enum_fields["_" + key].type;
                        rec[key].value = record[key];

                    }
                })
            })
            exp.push(rec);
        });

        return exp;
    }

    this.read = function(id) {
        rec = {};
        this.data.forEach(function(record) {
            if (record["id"] == id) {
                keys = Object.keys(record);
                keys.forEach(function(key) {
                    rec[key] = new Object();
                    rec[key].type = this.enum_fields["_" + key].type;
                    rec[key].value = record[key];
                });
            }
        });
        return rec;
    }

    this.update = function(record) {
        this.validModel();

        //заменить запись с указанным ID
        let i = 0;
        this.data.forEach(function(piece) {
            if (piece["id"] == record.enum_fields._id)
                data[i] = record;
            i++;
        });

        //сообщить контроллеру об изменении в записях
        this.controller.updateViewRecs();
    }

    this.delete = function() {

    }

    this.fly = function(departurePoint, destinationPoint) {

    }

    this.constructor = function(context, concreteController) {
        //загрузка из заглушки записей БД посредством eval()
        this.data = eval(context + "_data");
        this.controller = concreteController;
    }

    this.constructor(context, concreteController);
}