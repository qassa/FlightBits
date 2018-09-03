function TableView() {
    table = undefined;

    function initTools() {
        var elem = byCl("add");
        elem.addEventListener('click', fillModal);

        var elem = byCl("edit");
        elem.addEventListener('click', fillModal);

        var elem = byCl("remove");
        elem.addEventListener('click', deleteRec);
    }

    function modalBackground() {
        //modal_text добавляется только при появлении модального окна, нет необходимости изменять style.display
        //document.getElementById("modal_text").style.display = "none";
        byId("fon").style.display = "none";
    }

    tr = function(table) {
        trr = document.createElement("tr");
        table.appendChild(trr);
        return trr;
        //tag1.addEventListener("click", highlightRow);
    }

    function initHeader() {
        //запись новой строки в таблицу
        tr1 = tr(table);
        //отличается запись для первой колонки (checkbox)
        th_td("th", tr1, undefined, "input", undefined, "checkbox", "select_all");
        keys = this.controller.getDataKeys();
        for (var key in keys) {
            //keys.forEach(function(key) {
            name_ = this.controller.getFieldName(key);
            //keys[key].name;
            if (name_ != "id")
                th_td("th", tr1, name_);
        }
        tr1 = tr(table);
    }

    function initRecords() {
        //получаем массив записей
        records = this.controller.getDataRecords();

        //перебор всех записей
        records.forEach(function(elem) {
            //колонка с id всегда первая, найти id
            //без id выполнить вставку невозможно (далее будет невозможно обратиться к записи)
            elem_id = elem["id"];
            if (elem_id == undefined)
                throw new Error("id объекта не может отсутствовать");
            else {
                th_td("td", tr1, undefined, "input", undefined, "checkbox", "select_single", elem_id.value);
            }
            delete elem["id"];

            for (var key in elem) {
                if (elem[key].type == "text" || elem[key].type == "numeric")
                    th_td("td", tr1, elem[key].value);
                else
                //отличается запись для preview
                if (elem[key].type == "image")
                    th_td("td", tr1, undefined, "img", elem[key].value);
            }
            //перенос указателя строки
            tr1 = tr(table);
        });
    }

    function th_td(table_tag, tr, html, tag, src, type, name, id) {
        var th = document.createElement(table_tag);

        if (id != undefined)
            tr.setAttribute("id", id);

        if (tag != undefined) {
            tag1 = create(tag, th);
            if (src != undefined)
                tag1.setAttribute("src", "resource/" + src + ".jpg");
            if (type != undefined)
                tag1.setAttribute("type", type);
            if (name != undefined)
                tag1.setAttribute("name", name);

            if (html != undefined)
                tag1.innerHTML = html;

            //обработчик нажатия на checkbox
            if (type == "checkbox") {
                if (name == "select_all")
                    tag1.addEventListener("change", markRecords);
                if (name == "select_single")
                    tag1.addEventListener("change", markRecord);
            }
        } else
        if (html != undefined)
            th.innerHTML = html;
        tr.appendChild(th);
    }

    function initTableContent() {
        this.setController();
        if (table == undefined) {
            table = create("table", byId("table_container"), true).attr("id", "records_table");
        }
        //заполнение внутренней таблицы из БД / заглушки
        initHeader();
        initRecords();
    }

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
}