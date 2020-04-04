function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var currently = new Date()

if (parseInt(currently.toTimeString().split(" ")[0].split(":")[0]) >= 13 && parseInt(currently.toTimeString().split(" ")[0].split(":")[0]) <= 15) {
    document.getElementById("code").innerHTML = randomIntFromInterval(10, 50);
    document.getElementById("promocode").style = "display: block !important;";
}