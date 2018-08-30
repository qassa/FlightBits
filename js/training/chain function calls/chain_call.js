function attr(class_, value_) {
    elem.setAttribute(class_, value_);
}

function add(elem, a, b) {
    elem.a = a + b;
    return this;
}

elem = document.getElementById("element");
add(elem, 1, 3).attr("class", "value");