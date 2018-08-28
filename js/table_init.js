//скрипт, заполняющий все колонки для любой сущности системы (рейс, авиаединица, персонал)

function initTableContent() {
    //определение контекста (сущности, для которой выводятся данные)
    context = document.getElementById("screen_header");
    context = context.innerHTML;
    var textContext;
    var dataContext;
    for (var key in dataNameDictoinary) {
        if (key == context) {
            textContext = dataNameDictoinary[key];
            dataContext = dataDictionary[key];
        }
    }
    //заполнение внутренней таблицы из БД / заглушки

    //загрузка из заглушки БД посредством eval()
    data = eval(textContext + "_data");

    //заполнение экземпляра сущности. Для каждого поля, полученного из БД, находим ключ с таким же названием в схеме JS - объекта
    //(а конкретнее в свойстве enum_fields, которое содержит перечисление только полей объекта без функций и служебных свойств)
    var dataKeys = Object.keys(dataContext.enum_fields);

    data.forEach(function(record) {
        keys = Object.keys(record);
        keys.forEach(function(key) {
            dataKeys.forEach(function(dataKey) {
                if (dataKey.substring(1) == key)
                    dataContext.enum_fields[dataKey].value = record[key];
            })
        })
    });

    //запись новой строки в таблицу

    //отличается запись для первой колонки (radiobutton)
    //первая колонка с id всегда первая

    //отличается запись для preview

    var table = document.createElement("table");
    table.setAttribute("id", "records_table");
    document.getElementById("table_container").appendChild(table);

    tr = tr(table);
    th(tr, undefined, "input", undefined, "checkbox", "select_all");
    dataKeys.forEach(function(key) {
        th(tr, dataContext.enum_fields[key].name);
    })
    data.forEach(function(record) {
        keys = Object.keys(record);
        keys.forEach(function(key) {


            })
            //if (dataContext.enum_fields[key].type == "text" || dataContext.enum_fields[key].type == "numeric")

    });
}

function tr(table) {
    var tr = document.createElement("tr");
    table.appendChild(tr);
    return tr;
}

function th(tr, html, tag, src, type, name) {
    var th = document.createElement("th");
    if (tag != undefined) {
        tag1 = document.createElement(tag);

        if (src != undefined)
            tag1.setAttribute("src", src);
        if (type != undefined)
            tag1.setAttribute("type", type);
        if (name != undefined)
            tag1.setAttribute("name", name);

        if (html != undefined)
            tag1.innerHTML = html;
        th.appendChild(tag1);
    } else
    if (html != undefined)
        th.innerHTML = html;
    tr.appendChild(th);
}

//инициализация кол-ва строк данных на странице
function numOfRecords() {

}