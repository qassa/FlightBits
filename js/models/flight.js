function Flight() {
    this._id = {
        name: "id",
        type: "numeric",
        value: ""
    };
    this._number = {
        name: "№",
        type: "numeric",
        value: ""
    };
    this._type_vs = {
        name: "Тип воздушного судна",
        type: "text",
        value: ""
    };
    this._arrangement = {
        name: "Компоновка (предельная загрузка)",
        type: "numeric",
        value: ""
    };
    this._aircompany_vs = {
        name: "Принадлежность ВС",
        type: "text",
        value: ""
    }
    this._commander_surname = {
        name: "Фамилия командира ВС",
        type: "text",
        value: ""
    }
    this._route = {
        name: "Маршрут",
        type: "text",
        value: ""
    }
    this._plan_arrive_time = {
        name: "Плановое время прибытия",
        type: "text",
        value: ""
    }
    this._fact_arrive_time = {
        name: "Фактическое время прибытия",
        type: "text",
        value: ""
    }
    this._schedule_takeoff_time = {
        name: "Время отправления по расписанию",
        type: "text",
        value: ""
    }
    this._fact_takeoff_time = {
        name: "Фактичесок время взлета",
        type: "text",
        value: ""
    }
    this._reason_of_delay = {
        name: "Причина задержки",
        type: "text",
        value: ""
    }

    this.display_fields = {
        _number: this._number,
        _type_vs: this._type_vs,
        _arrangement: this._arrangement,
        _aircompany_vs: this._aircompany_vs,
        _commander_surname: this._commander_surname,
        _route: this._route,
        _plan_arrive_time: this._plan_arrive_time,
        _fact_arrive_time: this._fact_arrive_time,
        _schedule_takeoff_time: this._schedule_takeoff_time,
        _fact_takeoff_time: this._fact_takeoff_time,
        _reason_of_delay: this._reason_of_delay
    }

    this.enum_fields = {
        _id: this._id,
        _number: this._number,
        _type_vs: this._type_vs,
        _arrangement: this._arrangement,
        _aircompany_vs: this._aircompany_vs,
        _commander_surname: this._commander_surname,
        _route: this._route,
        _plan_arrive_time: this._plan_arrive_time,
        _fact_arrive_time: this._fact_arrive_time,
        _schedule_takeoff_time: this._schedule_takeoff_time,
        _fact_takeoff_time: this._fact_takeoff_time,
        _reason_of_delay: this._reason_of_delay
    }

}