function ModalView() {
    var that = {}
    that.controller;
    this.table;

    //одновременно может быть отображено только 1 модальное окно
    //функция заполнения элементами редактирования
    this.fillModal = function() {
        var action = this.getAttribute("class");
        keys = that.controller.getDisplayKeys();

        //заполнить содержимое модального окна
        var modalNode = byId("modal_text");
        modalNode.innerHTML = "";
        if (action == "add") {
            displayElements(modalNode, keys);
        }
        if (action == "edit") {
            displayElements(modalNode, keys);
            //заполнение модели данными из TablePartialView
            //dataToElements(modalNode);
        }
        if (action == "remove") {
            //вывод окна подтверждения
            confirmRemove(modalNode);
        }

        //навесить обработчик нажатия на закрытие окна 1 раз
        modalClose = byId("close_modal");
        modalClose.addEventListener('click', function() {
            (byId("modal_text")).style.display = "none";
            (byId("fon")).style.display = "none";
        });

        //отобразить окно
        byId("modal_text").style.display = "block";
        byId("fon").style.display = "block";

        modalCoords();
    }

    function saveRec() {
        modal = byId("modal_text");
        record = {};

        var elems = modal.getElementsByTagName("INPUT");
        max = elems.length;
        for (i = 0; i < max; i++) {
            elem = elems[i];
            //убрать edit в имени элемента
            name = elem.getAttribute("name");
            begin = name.indexOf("_edit");
            name = name.substring(0, name.length - (name.length - begin));
            record[name] = elem.value;
        }
        that.controller.create(record);
    }

    function displayElements(modalNode, keys) {
        renderCloseButton(modalNode);

        //rendering элементов ввода данных
        var position = 0,
            i = 0;

        for (var elem in keys) {
            var edit_value = create("div", modalNode, true).attr("class", "edit_field", true).inH(keys[elem].name + "<br>", false);
            var input;
            if (keys[elem].type == "text" || keys[elem].type == "numeric")
                input = create("input", edit_value, true).attr("type", "text", true).attr("name", elem + "_edit", false);

            if (keys[elem].type == "image") {
                input = create("input", edit_value, true).attr("type", "button", true).attr("value", "Выбрать файл...", true).attr("name", elem + "_edit", false);
            }
            i++;

            //в каждой строке расположены по 3 элемента редактирования
            position++;
            if (position >= 3) {
                //перенос на строку
                position = 0;
                create("div", modalNode, true).attr("id", "new_line");
            }
        }
        //вставка кнопки подтверждения
        create("div", modalNode, true).attr("id", "new_line");

        var save = create("input", modalNode, true).attr("type", "button", true).attr("class", "save_button", true).attr("value", "Сохранить");
        save.addEventListener("click", saveRec);
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

    //перерасчет координат левого верхнего угла для блока modal_text
    function modalCoords() {
        //найти блок с данными, определить его ширину
        modalBlock = byId("modal_text");
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
        modalClose = byId("close_modal");
        modalClose.style.left = modalWidth - 30;
    }

    function confirmRemove(modalNode) {
        renderCloseButton(modalNode);


    }

    function modalBackground() {
        //modal_text добавляется только при появлении модального окна, нет необходимости изменять style.display
        //document.getElementById("modal_text").style.display = "none";
        byId("fon").style.display = "none";
    }

    var render = function() {

    }

    this.constructor = function() {
        View.call(this);
        modalBackground();
        this.setController();
        that.controller = this.controller;

        render();
    }

    this.constructor();
}