function NavigationView() {
    var insertName = "views_container";
    var links = { "Авиатехника": "plane_view", "Рейсы": "voyage_view", "Персонал": "staff_view", "Пассажиры": "passanger_view", "График полетов": "flight_graph_view" };

    var render = function() {
        //вывод элементов навигационного меню системы
        var container = byId("views_container");
        for (var element in links) {
            view_slice = create("div", container, true).attr("class", "view_slice");
            nav_node = create("a", view_slice, true).inner(element);
            nav_node.addEventListener("click", changeHeader);
            create("div", container, true).attr("id", "view_space");
        }
    };

    changeHeader = function() {
        header = byId("screen_header");
        header.innerText = this.innerText;
        appNavigator.navigate(header.innerText);
    }

    constructor = function() {
        View.call(this);

        insertNode = byId(insertName);
        render();
    };

    constructor();

    //обращаться к переменной раньше, чем она была объявлена, можно (из-за облатси видимости функции)
    //вызов функций раньше, чем они были объявлены в коде, приведет к x is not a function
}