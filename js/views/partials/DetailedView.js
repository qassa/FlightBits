function DetailedView() {
    this.table;
    this.preview;
    this.container;
    that = {};
    that.controller;

    displayDetails = function() {

    }

    textResize = function() {
        var input = document.querySelectorAll('#stretch_text'),
            buffer = [];
        for (var i = 0; input.length > i; i++) {
            buffer[i] = document.createElement('div');
            buffer[i].className = "buffer";
            //вставляем скрытый div.buffer
            input[i].parentNode.insertBefore(buffer[i], input[i].nextSibling);

            input[i].oninput = function() {
                this.nextElementSibling.innerHTML = this.value;
                this.style.width = this.nextElementSibling.clientWidth + 'px';
            };
        }
    }

    this.displayDetails = function() {
        inserted = byId("detail_container");

        create("div", inserted, true).attr("class", "toolbox");
        this.preview = create("div", inserted, true).attr("class", "preview");
        create("img", this.preview, true).attr("src", "");

        this.container = create("div", inserted, true).attr("id", "fields_container");

        //заполнение содержимого детального просмотра
        keys = that.controller.getDisplayKeys();
        for (var key in keys) {
            name_ = that.controller.getFieldName(key);
            if (name_ != "preview") {
                div_text = keys[key].name;
                this.text_a(byId("fields_container"), div_text, name_ + "_data");
            }
        }
    }

    this.text_a = function(container, text, name) {
        create("div", container, true).inner(text);
        input1 = create("input", container, true).attr("type", "text");
        input1.setAttribute("id", "stretch_text");
        input1.setAttribute("value", "");
        input1.setAttribute("name", name);
    }

    this.render = function() {
        displayDetails();

        //сначала рендеринг тегов и содержимого
        this.displayDetails();
        //затем навешивание обработчиков по изменению размеров полей
        textResize();
    }

    this.constructor = function() {
        View.call(this);
        this.setController();
        that.controller = this.controller;

        this.render();
    }

    this.constructor();
}