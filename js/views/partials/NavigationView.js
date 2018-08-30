function NavigationView() {
    var insertName = "views_container";
    var links = { "Авиатехника": "plane_view", "Рейсы": "voyage_view", "Персонал": "staff_view" };

    var render = function() {
        //вывод элементов навигационного меню системы
        var container = byId("views_container");
        for (var element in links) {
            view_slice = create("div", container, true).attr("class", "view_slice");
            create("a", view_slice, true).inner(element);
            create("div", container, true).attr("id", "view_space");
        }
    };

    constructor = function() {
        View.call(this);

        insertNode = byId(insertName);
        render();
    };

    constructor();

    //обращаться к переменной раньше, чем она была объявлена, можно (из-за облатси видимости функции)
    //вызов функций раньше, чем они были объявлены в коде, приведет к x is not a function
}