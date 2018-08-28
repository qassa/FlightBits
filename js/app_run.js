var dataNameDictoinary = { "Авиатехника": "airplane", "Рейсы": "flight" };
var dataDictionary = { "Авиатехника": new Airplane(), "Рейсы": new Flight() };

function ready() {
    initTools();
    initTableContent();
    resizeText();

}
//ожидание полной прогрузки DOM
document.addEventListener("DOMContentLoaded", ready);