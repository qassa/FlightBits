function AirplaneController(context) {
    this.data; //хранилище для последней выборки из источника данных
    this.export_data;
    this.model;
    this.airplane = this;
    enum_fields = undefined;

    //данные модели, используемые при построении таблицы
    this.dataKeys = {};
    //данные модели, отображаемые на UI
    this.displayKeys = {};

    this.keysLoad = function(fields) {
        keys = {};
        for (var key in fields) {
            key = key.substring(1);
            keys[key] = new Object();
            keys[key].name = fields["_" + key].name;
            keys[key].type = fields["_" + key].type;
        }
        return keys;
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

    this.getDisplayKeys = function() {
        return this.displayKeys;
    }

    this.constructor = function(context) {
        //загрузка из заглушки записей БД посредством eval()
        this.data = eval(context + "_data");
        this.model = new Airplane();

        //короткая ссылка на перечислимые поля
        enum_fields = this.model.enum_fields;
        //сокращенная ссылка на редактируемые поля
        disp_fields = this.model.display_fields;

        this.dataKeys = this.keysLoad(enum_fields);
        this.displayKeys = this.keysLoad(disp_fields);
        //сохранение списка доступных для редактирования/добавления полей
        //предполагается, что в заглушке данных всегда есть хотя бы одна запись данных (хотя бы только структура)
        this.displayKeys = Object.keys(this.model.display_fields);
        return this.airplane;
    }

    this.constructor(context);
}