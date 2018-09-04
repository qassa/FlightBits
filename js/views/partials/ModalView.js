function ModalView() {

    //одновременно может быть отображено только 1 модальное окно
    //функция заполнения элементами редактирования
    this.fillModal = function() {
        var action = this.getAttribute("class");
        keys = this.controller.getDisplayKeys();

        //заполнить содержимое модального окна
        var modalNode = document.byId("modal_text");
        modalNode.innerHTML = "";
        if (action == "add") {
            displayElements(modalNode);
        }
        if (action == "edit") {
            displayElements(modalNode);
            //заполнение модели данными из TablePartialView
            //dataToElements(modalNode);
        }
        if (action == "remove") {
            //вывод окна подтверждения
            confirmRemove(modalNode);
        }

        //навесить обработчик нажатия на закрытие окна 1 раз
        modalClose = document.byId("close_modal");
        modalClose.addEventListener('click', function() {
            (document.byId("modal_text")).style.display = "none";
            (document.byId("fon")).style.display = "none";
        });

        //отобразить окно
        document.byId("modal_text").style.display = "block";
        document.byId("fon").style.display = "block";

        modalCoords();
    }

    var render = function() {

    }

    constructor = function() {
        View.call(this);
        render();
    }

    constructor();
}