var textContext;
var dataContext;
var data;
var table;
var dataKeys;

var marked = [];
var highlighted;

function new_line(table) {
    var line = document.createElement("div");
    line.setAttribute("id", "new_line");
    table.appendChild(line);
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