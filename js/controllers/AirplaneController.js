function AirplaneController(context) {
    this.data; //хранилище для последней выборки из источника данных
    this.export_data;
    this.model;
    this.airplane = this;
    enum_fields = undefined;

    //данные модели, используемые при построении таблицы
    this.dataKeys = {};
    //данные модели, отображаемые на UI
    this.displayKeys = [];

    this.dataKeysLoad = function() {
        //сохранение списка полей доступных для отображения в таблице данных
        //сохранение имени и типа
        this.dataKeys = {};

        for (var key in enum_fields) {
            //field = {};
            key = key.substring(1);
            this.dataKeys[key] = new Object();
            this.dataKeys[key].name = enum_fields["_" + key].name;
            this.dataKeys[key].type = enum_fields["_" + key].type;
            //this.dataKeys[key] = field;
            //this.dataKeys.push(field);
        }
    }

    this.getDataRecords = function() {
        //поиск совпадающих полей в объекте data и в Airplane
        export_data = [];
        dKeys = Object.keys(this.dataKeys);
        this.data.forEach(function(record) {
            //для каждого нового поля
            keys = Object.keys(record);
            rec = {};
            keys.forEach(function(key) {
                dKeys.forEach(function(dataKey) {
                    if (dataKey == key) {
                        rec[key] = new Object();
                        rec[key].type = enum_fields["_" + key].type;
                        rec[key].value = record[key];

                    }
                })
            })
            export_data.push(rec);
            tr1 = tr(table);
        });
        return export_data;
    }

    this.getDataKeys = function() {
        return this.dataKeys;
    }

    this.getFieldName = function(field) {
        return this.dataKeys[field].name;
    }

    this.constructor = function(context) {
        //загрузка из заглушки записей БД посредством eval()
        this.data = eval(context + "_data");
        this.model = new Airplane();

        //короткая ссылка на перечислимые поля
        enum_fields = this.model.enum_fields;

        this.dataKeysLoad();
        //сохранение списка доступных для редактирования/добавления полей
        //предполагается, что в заглушке данных всегда есть хотя бы одна запись данных (хотя бы только структура)
        this.displayKeys = Object.keys(this.model.display_fields);
        return this.airplane;
    }

    this.constructor(context);
}