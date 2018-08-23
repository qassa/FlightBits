var dataDictionary = { "Авиатехника": "airplane" };

//одновременно может быть отображено только 1 модальное окно
//функция заполнения элементами редактирования
function fillModal() {
    //определить, какое действие было вызвано
    var action = this.getAttribute("class");

    //определить контекст данных (с какой сущностью идет работа)
    context = document.getElementById("screen_header");
    context = context.innerHTML;
    for (var key in dataDictionary) {
        if (key == context)
            context = eval(dataDictionary[key] + "_data");
    }

    //заполнить содержимое модального окна
    //if (addedNodes == undefined)
    //    addedNodes = [];
    //addedNodes.push(document.createElement('div'));
    var modalNode;
    if (action == "add") {
        //modalNode = document.getElementById("modal_text");
    }

    //отобразить окно
    document.getElementById("modal_text").style.display = "block";
    document.getElementById("fon").style.display = "block";
}

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
}

function initTools() {
    document.getElementById("modal_text").style.display = "none";
    document.getElementById("fon").style.display = "none";

    var elem = document.getElementsByClassName("add")[0];
    elem.addEventListener('click', fillModal);

    var elem = document.getElementsByClassName("edit")[0];
    elem.addEventListener('click', fillModal);

    //навесить обработчик нажатия на закрытие окна 1 раз
    modalClose = document.getElementById("close_modal");
    modalClose.addEventListener('click', function() {
        (document.getElementById("modal_text")).style.display = "none";
        (document.getElementById("fon")).style.display = "none";
    });
}