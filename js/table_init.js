var textContext;
var dataContext;
var data;
var table;
var dataKeys;

var marked = [];
var highlighted;

var needTrUpdate = false;

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

//функция для предварительного сохранения всех узлов, которые относятся к input checkbox
//function selectChecks(){

//}

//инициализация кол-ва строк данных на странице
function numOfRecords() {

}