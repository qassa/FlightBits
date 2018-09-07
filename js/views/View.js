function View() {
    this.controller = undefined; //контроллер для передачи данных из View
    var cFactory = new ControllerFactory();
    this.lastSelected = -1;

    this.byId = function(id) {
        return document.getElementById(id);
    }
    this.byTg = function(tag) {
        return document.getElementsByTagName(tag);
    }
    this.byCl = function(classs) {
        return document.getElementsByClassName(classs)[0];
    }
    this.create = function(tag, parent, chain) {
        node = document.createElement(tag);
        parent.appendChild(node);

        if (chain == undefined) return node;
        else
            return this;
    }
    this.attr = function(attr, value, chain) {
        if (chain == true) {
            node.setAttribute(attr, value);
            return this;
        } else {
            node.setAttribute(attr, value);
            return node;
        }
    }
    this.inner = function(text, chain) {
        if (chain == true) {
            node.innerText = text;
            return this;
        } else {
            node.innerText = text;
            return node;
        }
    }
    this.inH = function(text, chain) {
        if (chain == true) {
            node.innerHTML = text;
            return this;
        } else {
            node.innerHTML = text;
            return node;
        }
    }

    this.setController = function() {
        if (this.controller == undefined) {
            //только если контроллер до этого не был установлен (Singleton)
            //определение контекста (сущности, для которой выводятся данные)
            context = document.getElementById("screen_header");
            context = context.innerHTML;

            this.controller = cFactory.factory(context);
        }
    }
}