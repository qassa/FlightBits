//добавить обработчики для всех div - элементов, вложенных в main_container
//обработка наведения на границы блока
var field_divs = document.querySelectorAll('#main_container div[id=data_field]');

Array.from(field_divs).forEach(function(element) {
    element.addEventListener('mousemove', mouseon);
    //дополнительный обработчик события leave (устранение мерцания курсора)
    element.addEventListener('mouseleave', function() { this.style.cursor = "default" });
    element.addEventListener('mousedown', initDrag);
});


function mouseon(e) {
    //определить, в какой части блока находится курсор
    div_width = this.offsetWidth - (this.offsetWidth - this.clientWidth);
    div_left = this.offsetLeft;

    if (e.clientX <= div_left + div_width && e.clientX >= div_left + 0.95 * div_width) {
        //курсор находится на правой границе блока
        //изменяем стиль курсора
        this.style.cursor = "col-resize";
    } else
        this.style.cursor = "default";
}

var startX, startY, startWidth;
var minWidth = 50;
var handler;

function initDrag(e) {
    if (this.style.cursor == "col-resize") {
        elem = this;

        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(this).width, 10);

        document.body.addEventListener('mouseup', stopDrag);
        handler = function(e) { repeatDrag(e, elem) };
        document.body.addEventListener('mousemove', handler);

        //this.addEventListener('mousemove', doDrag);
    }
}

function repeatDrag(e, data_field) {
    //получаем № колонки, в которой находится элемент
    var col_id = data_field.getAttribute('col_id');
    //data_field = document.querySelectorAll("div[col_id=col_id]");
    data_field = FindByAttributeValue('col_id', col_id, 'div');

    widthToSet = startWidth + e.clientX - startX;
    if (widthToSet >= minWidth) {
        var container = document.getElementById("main_container");
        var widthh = parseInt(document.defaultView.getComputedStyle(container).width, 10);
        container.style.width = widthh + 2 + 'px';
        data_field.forEach(function(elem) { elem.style.width = widthToSet + 'px'; });
    }
}

function stopDrag(e) {
    document.body.removeEventListener('mousemove', handler);
    document.body.removeEventListener('mouseup', stopDrag);
}

function FindByAttributeValue(attribute, value, element_type) {
    element_type = element_type || "*";
    var found = [];
    var All = document.getElementsByTagName(element_type);
    for (var i = 0; i < All.length; i++) {
        if (All[i].getAttribute(attribute) == value) { found.push(All[i]); }
    }
    return found;
}


//инициализация кол-ва строк данных на странице
function numOfRecords() {

}


function ready() {
    modalCoords();
    initTools();
    resizeText();
}
//ожидание полной прогрузки DOM
document.addEventListener("DOMContentLoaded", ready);

//перерасчет координат левого верхнего угла для блока modal_text
function modalCoords() {
    //найти блок с данными, определить его ширину
    modalBlock = document.getElementById("modal_text");
    modalWidth = modalBlock.clientWidth;
    modalHeight = modalBlock.clientHeight;
    //взять ширину доступную для отбражения в окне браузера
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    //определить координаты левой верхней точки
    modalBlock.style.left = (windowWidth / 2) - (modalWidth / 2);
    modalBlock.style.top = (windowHeight / 2) - (modalHeight / 2);

    modalWidth = modalBlock.clientWidth;

    //установить положение для элемента close_modal
    modalClose = document.getElementById("close_modal");
    modalClose.style.left = modalWidth - 30;
    modalClose.addEventListener('click', function() {
        (document.getElementById("modal_text")).style.display = "none";
        (document.getElementById("fon")).style.display = "none";
    });
}

function initTools() {
    document.getElementById("modal_text").style.display = "none";
    document.getElementById("fon").style.display = "none";

    var elem = document.getElementsByClassName("add")[0];
    elem.addEventListener('click', function() {
        (document.getElementById("modal_text")).style.display = "block";
        (document.getElementById("fon")).style.display = "block";
    });

    var elem = document.getElementsByClassName("edit")[0];
    elem.addEventListener('click', function() {
        (document.getElementById("modal_text")).style.display = "block";
        (document.getElementById("fon")).style.display = "block";
    });
}