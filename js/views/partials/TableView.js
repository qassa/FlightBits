function TableView() {
    var controller = undefined; //контроллер для передачи данных из View

    var render = function() {
        //элементы для редактирования записей расположены в таблице
        initTools();
        modalBackground();
        initTableContent();
    };

    constructor = function() {
        render();
    };

    constructor();

    function setController() {
        if (controller == undefined) {
            //только если контроллер до этого не был установлен (Singleton)
            //определение контекста (сущности, для которой выводятся данные)
            context = document.getElementById("screen_header");
            context = context.innerHTML;

            for (var key in dataNameDictoinary) {
                if (key == context) {
                    textContext = dataNameDictoinary[key];
                    dataContext = dataDictionary[key];
                }
            }

            //загрузка из заглушки записей БД посредством eval()
            data = eval(textContext + "_data");

            if (table == undefined) {
                table = document.createElement("table");
                table.setAttribute("id", "records_table");
                document.getElementById("table_container").appendChild(table);
            }

            dataKeys = Object.keys(dataContext.enum_fields);
        }
    }

    function initTools() {
        var elem = document.getElementsByClassName("add")[0];
        elem.addEventListener('click', fillModal);

        var elem = document.getElementsByClassName("edit")[0];
        elem.addEventListener('click', fillModal);

        var elem = document.getElementsByClassName("remove")[0];
        elem.addEventListener('click', deleteRec);
    }

    function modalBackground() {
        //modal_text добавляется только при появлении модального окна, нет необходимости изменять style.display
        //document.getElementById("modal_text").style.display = "none";
        document.getElementById("fon").style.display = "none";
    }

    function initTableContent() {
        //заполнение внутренней таблицы из БД / заглушки
        setContext();

        //запись новой строки в таблицу

        //отличается запись для первой колонки (radiobutton)
        //первая колонка с id всегда первая

        //отличается запись для preview

        initHeader();

        //заполнение экземпляра сущности. Для каждого поля, полученного из БД, находим ключ с таким же названием в схеме JS - объекта
        //(а конкретнее в свойстве enum_fields, которое содержит перечисление только полей объекта без функций и служебных свойств)

        initRecords();
    }
}