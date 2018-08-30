function View() {
    this.byId = function(id) {
        return document.getElementById(id);
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
}