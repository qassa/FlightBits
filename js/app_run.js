var dataNameDictoinary = { "Авиатехника": "airplane", "Рейсы": "flight", "Пассажиры": "passanger" };
var dataDictionary = { "Авиатехника": new Airplane(), "Рейсы": new Flight(), "Пассажиры": new Passnager() };

function ready() {
    initTools();
    initTableContent();
    resizeText();

}
//ожидание полной прогрузки DOM
document.addEventListener("DOMContentLoaded", ready);