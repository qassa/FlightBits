var textContext;
var dataContext;
var data;
var table;
var dataKeys;

var marked = [];
var highlighted;

function setContext() {
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

function initHeader() {
    tr1 = tr(table);
    th_td("th", tr1, undefined, "input", undefined, "checkbox", "select_all");
    dataKeys.forEach(function(key) {
        if (dataContext.enum_fields[key].name != "id")
            th_td("th", tr1, dataContext.enum_fields[key].name);
    });
    tr1 = tr(table);
}

function initRecords() {
    data.forEach(function(record) {
        keys = Object.keys(record);
        keys.forEach(function(key) {
            dataKeys.forEach(function(dataKey) {
                if (dataKey.substring(1) == key) {
                    dataContext.enum_fields[dataKey].value = record[key];
                    if (dataContext.enum_fields[dataKey].name == "id")
                        th_td("td", tr1, undefined, "input", undefined, "checkbox", "select_single", record[key]);
                    else
                    if (dataContext.enum_fields[dataKey].type == "text" || dataContext.enum_fields[dataKey].type == "numeric")
                        th_td("td", tr1, record[key]);
                    else
                    if (dataContext.enum_fields[dataKey].type == "image")
                        th_td("td", tr1, undefined, "img", record[key]);
                }
            })
        })
        tr1 = tr(table);
    });
}

//скрипт, заполняющий все колонки view для любой сущности системы (рейс, авиаединица, персонал)
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

function new_line(table) {
    var line = document.createElement("div");
    line.setAttribute("id", "new_line");
    table.appendChild(line);
}

function tr(table) {
    var tr = document.createElement("tr");
    //tag1.addEventListener("click", highlightRow);
    table.appendChild(tr);
    return tr;
}

function th_td(table_tag, tr, html, tag, src, type, name, id) {
    var th = document.createElement(table_tag);

    if (id != undefined)
        tr.setAttribute("id", id);

    if (tag != undefined) {
        tag1 = document.createElement(tag);

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

        th.appendChild(tag1);
    } else
    if (html != undefined)
        th.innerHTML = html;
    tr.appendChild(th);
}

//пользователь может выбрать любую строку
function markRecord() {
    id = this.parentNode.parentNode.getAttribute("id");
    if (this.checked)
        marked.push(id);
    else
        marked.splice(marked.indexOf(id), 1);
}

function markRecords() {
    checked = this.checked;
    if (checked) {


        //перебор tr в table
        for (var node in table.rows) {
            node = table.rows[node];
            //перебор childNodes в tr
            for (var cell in node.childNodes) {
                //перебор childNodes в tr
                cell = node.childNodes[cell];
                for (var child in cell.childNodes) {
                    child = cell.childNodes[child];
                    if (child.nodeName == "INPUT" && child.getAttribute("name") == "select_single") {
                        child.checked = checked;
                        marked.push(node.getAttribute("id"));
                    }
                }
            }
        }


    } else {
        marked = [];

        for (var node in table.rows) {
            node = table.rows[node];
            for (var cell in node.childNodes) {
                cell = node.childNodes[cell];
                for (var child in cell.childNodes) {
                    child = cell.childNodes[child];
                    if (child.nodeName == "INPUT" && child.getAttribute("name") == "select_single") {
                        child.checked = checked;
                    }
                }
            }
        }


    }

}

var needTrUpdate = false;

function deleteRec() {
    rows = document.getElementsByTagName("tr");

    for (var mark in marked) {
        var d;
        for (var t = 0; t < rows.length; t++) {
            //for (row in rows) {
            if (rows[t] != "length" && rows[t] != "item" && rows[t] != "namedItem")
                if (rows[t].getAttribute("id") == marked[mark]) {
                    d = rows[t];
                    d.remove();
                    //сместиться назад
                    t = 0;
                    //rows = document.getElementsByTagName("tr");
                    marked.splice(marked.indexOf(marked[mark]), 1);
                }
        }

    }
}

function deleteRecs() {
    table.remove();
    table = undefined;
}

function saveRec() {
    setContext();
    modal = document.getElementById("modal_text");

    //dataContextEnum = dataContext.enum_fields;
    Keys = Object.keys(dataContext.enum_fields);

    Keys.forEach(function(dataKey) {
        //найти элемент на странице и записать значение
        var elems = modal.getElementsByTagName("INPUT");
        max = elems.length;
        for (i = 0; i < max; i++) {
            if (elems[i].getAttribute("name") == dataKey.substring(1) + "_edit")
                dataContext.enum_fields[dataKey].value = elems[i].value;
        }
    });

    global_id++;
    dataContext.enum_fields["_id"].value = global_id;

    pushData(data, dataContext.enum_fields);

    setContext();
    initHeader();
    initRecords();
}

function pushData(data, dataContextEnum) {
    deleteRecs();

    recordKeys = Object.getOwnPropertyNames(dataContextEnum);
    data.push({});
    data_s = data[data.length - 1];
    for (var key in recordKeys) {
        data_s[recordKeys[key].substring(1)] = dataContextEnum[recordKeys[key]].value;
    }
}

function highlightRow() {
    //подсветка всей строки

    //запись id (используется позже для редактирования)
}

//функция для предварительного сохранения всех узлов, которые относятся к input checkbox
//function selectChecks(){

//}

//инициализация кол-ва строк данных на странице
function numOfRecords() {

}