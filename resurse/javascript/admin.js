window.onload = function () {
    // obiect de tip XMLHttpRequest cu care se pot transmite cereri catre server
    var ajaxRequest = new XMLHttpRequest();


    // la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
    /* stari posibile:
    0 - netrimis
    1 - conexiune deschisa
    2 - s-au transmis headerele
    3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
    4 - a terminat
    */

    ajaxRequest.onreadystatechange = function () {
        //daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
        if (this.readyState == 4 && this.status == 200) {
            //in proprietatea responseText am contintul fiserului JSON
            // document.getElementById("afisJson").innerHTML = this.responseText;
            var obJson = JSON.parse(this.responseText);
            afiseajaJsonTemplate(obJson);
        }
    };

    //deschid o conexiune cu o cerere de tip get catre server
    //json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
    ajaxRequest.open("GET", "/json/mancare.json", true);
    //trimit catre server cererea
    ajaxRequest.send();

    function afiseajaJsonTemplate(obJson) {
        //in acets div voi afisa template-urile   
        let container = document.getElementById("afisTemplate");

        //in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
        let textTemplate = "";

        // parcurg vetorul de studenti din obJson

        //console.log(obJson.length);
        for (let i = 0; i < obJson.length; i++) {
            for (let j = 0; j < Object.keys(obJson[i].tipuri).length; j++) {
                console.log(obJson[i].tipuri[j].disponibilitate);
                textTemplate += ejs.render('<div class="col-4 col-sm-12 col-md-12">\
						<div class="card">\
							<div class="container-card">\
								<img class="bigger <% if(!alimente.disponibilitate){ %>grayscale<% } %>" src="<%= alimente.imagine %>" alt="<%= alimente.imagine %>" title="<%= alimente.imagine %>">\
								<button class="favorite btn-card-delete"><i class="fa fa-times" aria-hidden="true"></i>                                </button>\
							</div>\
							<h3><%= alimente.nume %></h3>\
                            <p class="pt-3"><%= alimente.ingrediente %></p>\
                            <p class="price mt-4 left"><%= alimente.pret %> lei</p>\
                            <button class="btn btn-outline-primary mt-3 right" type="button" <% if(!alimente.disponibilitate){ %>disabled<% } %>>Adaugă în coș</button>\
                        </div>\
                    </div>', {
                    alimente: obJson[i].tipuri[j]
                });
            }
        }
        //adaug textul cu afisarea studentilor in container
        container.innerHTML = textTemplate;

    }
}