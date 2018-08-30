//одновременно может быть отображено только 1 модальное окно
//функция заполнения элементами редактирования
function fillModal() {
    //определить, какое действие было вызвано
    var action = this.getAttribute("class");

    //определить контекст данных (с какой сущностью идет работа)
    context = document.getElementById("screen_header");
    context = context.innerHTML;
    //перебор в цикле осуществляется по ключу
    for (var key in dataDictionary) {
        if (key == context)
            context = dataDictionary[key];
    }

    //заполнить содержимое модального окна
    //if (addedNodes == undefined)
    //    addedNodes = [];
    //addedNodes.push(document.createElement('div'));
    var modalNode = document.getElementById("modal_text");
    modalNode.innerHTML = "";
    if (action == "add") {
        //вывод элементов для ввода
        displayElements(modalNode);

    }
    if (action == "edit") {
        //вывод элементов для ввода
        displayElements(modalNode);
        //заполнение модели данными из view
        //dataToElements(modalNode);
    }
    if (action == "remove") {
        //вывод окна подтверждения
        confirmRemove(modalNode);
    }

    //навесить обработчик нажатия на закрытие окна 1 раз
    modalClose = document.getElementById("close_modal");
    modalClose.addEventListener('click', function() {
        (document.getElementById("modal_text")).style.display = "none";
        (document.getElementById("fon")).style.display = "none";
    });

    //отобразить окно
    document.getElementById("modal_text").style.display = "block";
    document.getElementById("fon").style.display = "block";

    modalCoords();
}

function renderCloseButton(modalNode) {
    //rendering кнопки закрытия Popup
    var div = document.createElement("div");
    div.setAttribute("id", "close_modal");
    modalNode.appendChild(div);
    var img = document.createElement("img");
    img.setAttribute("src", "resource/close_modal.png");
    div.appendChild(img);
}

function confirmRemove(modalNode) {
    renderCloseButton(modalNode);


}

function displayElements(modalNode) {
    renderCloseButton(modalNode);

    //rendering элементов ввода данных
    var position = 0,
        i = 0;
    names = Object.getOwnPropertyNames(context.display_fields);
    for (var field in context.display_fields) {
        _field = context.display_fields[field];
        var div = document.createElement("div");
        div.setAttribute("class", "edit_field");
        div.innerHTML = _field.name + "<br>";
        var input = document.createElement("input");
        //input.setAttribute("value", "");
        if (_field.type == "text" || _field.type == "numeric")
            input.setAttribute("type", "text");

        if (_field.type == "image") {
            input.setAttribute("type", "button");
            input.setAttribute("value", "Выбрать файл...");
        }
        input.setAttribute("name", names[i].substring(1) + "_edit");
        div.appendChild(input);
        modalNode.appendChild(div);
        i++;

        //в каждой строке расположены по 3 элемента редактирования
        position++;
        if (position >= 3) {
            //перенос на строку
            position = 0;
            var div = document.createElement("div");
            div.setAttribute("id", "new_line");
            modalNode.appendChild(div);
        }
    }
    //вставка кнопки подтверждения
    var div = document.createElement("div");
    div.setAttribute("id", "new_line");
    modalNode.appendChild(div);

    var save = document.createElement("input");
    save.setAttribute("type", "button");
    save.setAttribute("class", "save_button");
    save.setAttribute("value", "Сохранить");
    save.addEventListener("click", saveRec);

    modalNode.appendChild(save);
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