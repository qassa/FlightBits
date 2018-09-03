function DetailedView() {
    var render = function() {
        displayDetails();
        textResize();
    }

    constructor = function() {
        View.call(this);

        render();
    }

    constructor();

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
}