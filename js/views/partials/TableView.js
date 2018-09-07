var marked = [];

function TableView(modal, detail) {
    this.modal;
    this.detail;
    that = {};
    that.controller;
    var that = {};
    that.table = undefined;

    function initTools() {
        var elem = byCl("add");
        elem.addEventListener('click', this.modal.fillModal);

        var elem = byCl("edit");
        elem.addEventListener('click', this.modal.fillModal);

        var elem = byCl("remove");
        elem.addEventListener('click', this.modal.deleteRec);
    }

    tr = function(table) {
        trr = document.createElement("tr");
        that.table.appendChild(trr);
        return trr;
        //tag1.addEventListener("click", highlightRow);
    }

    trSelected = function() {
        id = this.getAttribute("id");
        if (id != that.lastSelect) {
            if (that.lastSelect != -1) {
                table = byId("records_table", document);
                select = byId(that.lastSelect, table);
                select.style.background = 'none';
            }
            //обновление, highlight строки
            this.style.background = '#FFFFD5';
            that.lastSelect = id;
        }
        //запись значений во временный объект
        keys = that.controller.getDataKeys();

        sel_obj = {};
        tr_h = byId("table_container")
        tr_h = byId("0");
        for (var child of tr_h.childNodes) {
            attrib = child.getAttribute("class");
            if (attrib != undefined) {
                begin = attrib.indexOf("_data");
                field = attrib.substring(0, attrib.length - (attrib.length - begin));
                sel_obj[field] = this.childNodes[child].innerText;
            } else {
                sel_obj["id"] = this.getAttribute("id");
            }
        }

        //обновление детального просмотра (если имеется)
        if (detail != undefined) {

        }
    }

    function initHeader() {
        //запись новой строки в таблицу
        tr1 = tr(that.table);
        tr1.setAttribute("id", "0");
        //отличается запись для первой колонки (checkbox)
        th_td("th", tr1, undefined, "input", undefined, "checkbox", "select_all");
        keys = this.controller.getDataKeys();
        for (var key in keys) {
            name_ = this.controller.getFieldName(key);
            if (name_ != "id") {
                th = th_td("th", tr1, name_);
                th.setAttribute("class", key + "_data");
            }
        }
        tr1 = tr(that.table);
    }

    function initRecords() {
        //получаем массив записей
        records = this.controller.getDataRecords();

        //перебор всех записей
        records.forEach(function(elem) {
            //обработчик нажатия на строку с данными
            tr1.addEventListener('click', trSelected);

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
            tr1 = tr(that.table);
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
        return th;
    }

    function initTableContent() {
        if (that.table == undefined) {
            that.table = create("table", byId("table_container"), true).attr("id", "records_table");
        }
        //заполнение внутренней таблицы из БД / заглушки
        initHeader();
        initRecords();
    }

    //пользователь может отметить на удаление либо редактирование любую строку
    function markRecord() {
        id = this.parentNode.parentNode.getAttribute("id");
        if (this.checked)
            marked.push(id);
        else
            marked.splice(marked.indexOf(id), 1);
    }

    function markRecords() {
        checked = this.checked;

        nodes = getTableNodes();
        nodes.forEach(function(child) {
            if (child.nodeName == "INPUT" && child.getAttribute("name") == "select_single") {
                child.checked = checked;
                if (checked) {
                    marked.push(node.getAttribute("id"));
                } else {
                    marked = [];
                }
            }
        });
    }

    function getTableNodes() {
        nodes = [];
        for (var row of that.table.rows) {
            for (var cell of row.childNodes) {
                for (var child of cell.childNodes)
                    nodes.push(child);
            }
        }
        return nodes;
    }

    function deleteRec() {
        for (var mark of marked) {
            for (var row of byTg("tr")) {
                if (row.getAttribute("id") == mark) {
                    row.remove();
                    marked.splice(marked.indexOf(mark), 1);
                    //повторный вызов
                    deleteRec();
                    return;
                }
            }
        }
    }

    function deleteRecs() {
        that.table.remove();
        that.table = undefined;

        //зануление маркеров отмеченных записей
        marked = [];
    }

    function highlightRow() {
        //подсветка всей строки

        //запись id (используется позже для редактирования)
    }

    var render = function() {
        //элементы для редактирования записей расположены в таблице
        initTools();
        initTableContent();
    };

    constructor = function(modal, detail) {
        View.call(this);
        this.setController();
        that.controller = this.controller;
        this.modal = modal;
        this.detail = detail;
        that.lastSelect = this.lastSelected;

        render();
    };

    constructor(modal, detail);
}