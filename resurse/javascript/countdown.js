// I) Taskuri de nivel 1 (punctaj: 0.5p)
// 6. Numaratoare inversa. 
//    La intrarea pe pagina sa se afiseze cate ore, minute, secunde mai sunt pana la finalul sesiunii 
//    (sau o alta data calendaristica). Sa se actualizeze aceasta informatie la fiecare secunda.

var dataFinal = new Date("Jun 28, 2025 12:00:00").getTime();

// actualizare la fiecare secunda
var x = setInterval(function () {

    // variabila in care stochez data si timpul
    var dataCurenta = new Date().getTime();

    // diferenta intre data data si cea curenta
    var diferenta = dataFinal - dataCurenta;

    // calcularea timpului pentru ore, minute si secunde 
    var ore = Math.floor((diferenta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minute = Math.floor((diferenta % (1000 * 60 * 60)) / (1000 * 60));
    var secunde = Math.floor((diferenta % (1000 * 60)) / 1000);

    // afisarea rezultatului in demo
    document.getElementById("countdown").innerHTML = ore + " ore " + minute + " minute " + secunde + " secunde ";

    console.log('test');

    // daca s-a terminat countdownul se va afisa un mesaj
    if (diferenta < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Evenimentul a avut loc! 🎉";
    }
}, 1000);